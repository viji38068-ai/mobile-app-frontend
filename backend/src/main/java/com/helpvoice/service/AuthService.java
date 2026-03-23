package com.helpvoice.service;

import com.helpvoice.model.User;
import com.helpvoice.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.Random;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    
    private static final javax.crypto.SecretKey JWT_SECRET = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    
    public User login(String phoneNumber) {
        Optional<User> userOpt = userRepository.findByPhoneNumber(phoneNumber);
        User user;
        if (userOpt.isEmpty()) {
            user = new User(phoneNumber, "User " + phoneNumber, phoneNumber + "@helpvoice.com");
            userRepository.save(user);
        } else {
            user = userOpt.get();
        }
        return user;
    }
    
    public String generateOTP(User user) {
        Random random = new Random();
        String otp = String.format("%06d", random.nextInt(1000000));
        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plus(10, ChronoUnit.MINUTES));
        userRepository.save(user);
// OTP mock for demo (SMS skipped per requirements)
        return otp;
    }
    
    public boolean verifyOTP(String phoneNumber, String otp) {
        Optional<User> userOpt = userRepository.findByPhoneNumber(phoneNumber);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return user.getOtp() != null 
                && user.getOtp().equals(otp) 
                && user.getOtpExpiry().isAfter(LocalDateTime.now());
        }
        return false;
    }
    
    public String generateJWT(String phoneNumber) {
        User user = userRepository.findByPhoneNumber(phoneNumber).get();
        return Jwts.builder()
            .setSubject(user.getPhoneNumber())
            .setIssuedAt(new java.util.Date())
            .setExpiration(new java.util.Date(System.currentTimeMillis() + 86400000)) // 24h
            .signWith(JWT_SECRET)
            .compact();
    }
}
