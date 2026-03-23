package com.helpvoice.controller;

import com.helpvoice.model.User;
import com.helpvoice.repository.UserRepository;
import com.helpvoice.dto.LoginRequest;
import com.helpvoice.dto.OTPRequest;
import com.helpvoice.dto.LoginResponse;
import com.helpvoice.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        // Generate OTP and send (mock SMS)
        User user = authService.login(request.getPhoneNumber());
        String otp = authService.generateOTP(user);
        return ResponseEntity.ok(new LoginResponse("OTP sent to " + request.getPhoneNumber(), otp));
    }

    @PostMapping("/otp")
    public ResponseEntity<String> verifyOTP(@Valid @RequestBody OTPRequest request) {
        if (authService.verifyOTP(request.getPhoneNumber(), request.getOtp())) {
            String token = authService.generateJWT(request.getPhoneNumber());
            return ResponseEntity.ok(token);
        }
        return ResponseEntity.badRequest().body("Invalid OTP");
    }
}
