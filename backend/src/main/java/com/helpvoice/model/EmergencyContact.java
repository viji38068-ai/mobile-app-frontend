package com.helpvoice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

@Document(collection = "emergency_contacts")
public class EmergencyContact {

    @Id
    private String id;

    private String userId;

    @NotBlank
    @Size(min = 3, max = 50)
    private String phoneNumber;

    @NotBlank
    @Size(min = 1, max = 100)
    private String name;

    private String relationship;

    private boolean isActive = true;

    private LocalDateTime createdAt = LocalDateTime.now();

    // Constructors
    public EmergencyContact() {}

    public EmergencyContact(String userId, String phoneNumber, String name, String relationship) {
        this.userId = userId;
        this.phoneNumber = phoneNumber;
        this.name = name;
        this.relationship = relationship;
    }

    // Getters/Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRelationship() { return relationship; }
    public void setRelationship(String relationship) { this.relationship = relationship; }

    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { this.isActive = active; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
