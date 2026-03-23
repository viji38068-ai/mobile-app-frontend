package com.helpvoice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

@Document(collection = "users")
public class User {
    
    @Id
    private String id;
    
    @NotBlank
    @Size(min = 3, max = 50)
    private String phoneNumber;
    
    @Email
    private String email;
    
    @NotBlank
    private String name;
    
    private String otp;
    
    private LocalDateTime otpExpiry;
    
    private boolean voiceSafetyEnabled = false;
    
    private LocalDateTime createdAt = LocalDateTime.now();

    // Constructors
    public User() {}
    
    public User(String phoneNumber, String name, String email) {
        this.phoneNumber = phoneNumber;
        this.name = name;
        this.email = email;
    }

    // Getters/Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getOtp() { return otp; }
    public void setOtp(String otp) { this.otp = otp; }
    
    public LocalDateTime getOtpExpiry() { return otpExpiry; }
    public void setOtpExpiry(LocalDateTime otpExpiry) { this.otpExpiry = otpExpiry; }
    
    public boolean isVoiceSafetyEnabled() { return voiceSafetyEnabled; }
    public void setVoiceSafetyEnabled(boolean voiceSafetyEnabled) { this.voiceSafetyEnabled = voiceSafetyEnabled; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
