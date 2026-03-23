package com.helpvoice.dto;

public class DashboardStats {
    
    private int voiceChecks;
    private int alertsSent;
    private boolean voiceSafetyActive;
    
    // Constructors
    public DashboardStats() {}
    
    public DashboardStats(int voiceChecks, int alertsSent, boolean voiceSafetyActive) {
        this.voiceChecks = voiceChecks;
        this.alertsSent = alertsSent;
        this.voiceSafetyActive = voiceSafetyActive;
    }
    
    // Getters/Setters
    public int getVoiceChecks() { return voiceChecks; }
    public void setVoiceChecks(int voiceChecks) { this.voiceChecks = voiceChecks; }
    
    public int getAlertsSent() { return alertsSent; }
    public void setAlertsSent(int alertsSent) { this.alertsSent = alertsSent; }
    
    public boolean isVoiceSafetyActive() { return voiceSafetyActive; }
    public void setVoiceSafetyActive(boolean voiceSafetyActive) { this.voiceSafetyActive = voiceSafetyActive; }
}
