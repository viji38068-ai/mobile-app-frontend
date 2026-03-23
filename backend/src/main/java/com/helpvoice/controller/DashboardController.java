package com.helpvoice.controller;

import com.helpvoice.model.User;
import com.helpvoice.repository.AlertRepository;
import com.helpvoice.repository.UserRepository;
import com.helpvoice.dto.DashboardStats;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private AlertRepository alertRepository;

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardStats> getDashboardStats(Authentication auth) {
        String phoneNumber = auth.getName();
        User user = userRepository.findByPhoneNumber(phoneNumber).orElseThrow();
        
        long voiceChecks = alertRepository.countByUserAndType(user, "VOICE");
        long alertsSent = alertRepository.countByUserAndStatus(user, "ACTIVE");
        boolean voiceSafety = user.isVoiceSafetyEnabled();
        
        DashboardStats stats = new DashboardStats();
        stats.setVoiceChecks((int) voiceChecks);
        stats.setAlertsSent((int) alertsSent);
        stats.setVoiceSafetyActive(voiceSafety);
        
        return ResponseEntity.ok(stats);
    }
    
    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getProfile(Authentication auth) {
        String phoneNumber = auth.getName();
        User user = userRepository.findByPhoneNumber(phoneNumber).orElseThrow();
        
        Map<String, Object> profile = new HashMap<>();
        profile.put("name", user.getName());
        profile.put("phone", user.getPhoneNumber());
        profile.put("email", user.getEmail());
        profile.put("voiceSafetyEnabled", user.isVoiceSafetyEnabled());
        
        return ResponseEntity.ok(profile);
    }
}
