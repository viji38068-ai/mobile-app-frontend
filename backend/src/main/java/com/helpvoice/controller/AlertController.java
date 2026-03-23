package com.helpvoice.controller;

import com.helpvoice.model.Alert;
import com.helpvoice.model.User;
import com.helpvoice.repository.AlertRepository;
import com.helpvoice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin(origins = "http://localhost:3000")
public class AlertController {

    @Autowired
    private AlertRepository alertRepository;
    
    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<Map<String, String>> createAlert(@RequestBody Map<String, String> request, Authentication auth) {
        String phoneNumber = auth.getName();
        User user = userRepository.findByPhoneNumber(phoneNumber).orElseThrow();
        
        Alert alert = new Alert();
        alert.setUser(user);
        alert.setType(request.getOrDefault("type", "EMERGENCY"));
        alert.setLocation(request.getOrDefault("location", "Unknown"));
        alert.setStatus("ACTIVE");
        
        alertRepository.save(alert);
        
        Map<String, String> response = Map.of("message", "Alert created", "alertId", alert.getId().toString());
        return ResponseEntity.ok(response);
    }
    
    @GetMapping
    public ResponseEntity<List<Alert>> getUserAlerts(Authentication auth) {
        String phoneNumber = auth.getName();
        User user = userRepository.findByPhoneNumber(phoneNumber).orElseThrow();
        List<Alert> alerts = alertRepository.findRecentAlertsByUser(user);
        return ResponseEntity.ok(alerts);
    }
}
