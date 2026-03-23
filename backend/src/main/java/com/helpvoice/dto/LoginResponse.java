package com.helpvoice.dto;

public class LoginResponse {
    
    private String message;
    private String otp; // Mock for demo

    public LoginResponse(String message, String otp) {
        this.message = message;
        this.otp = otp;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }
}
