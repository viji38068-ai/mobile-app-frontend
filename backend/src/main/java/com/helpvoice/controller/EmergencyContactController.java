package com.helpvoice.controller;

import com.helpvoice.model.EmergencyContact;
import com.helpvoice.model.User;
import com.helpvoice.repository.EmergencyContactRepository;
import com.helpvoice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "http://localhost:3000")
public class EmergencyContactController {

    @Autowired
    private EmergencyContactRepository contactRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<EmergencyContact>> getContacts(Authentication auth) {
        String phoneNumber = auth.getName();
        String userId = userRepository.findByPhoneNumber(phoneNumber).map(User::getId).orElse(null);
        if (userId == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(contactRepository.findActiveByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<EmergencyContact> addContact(@Valid @RequestBody Map<String, String> request, Authentication auth) {
        String phoneNumber = auth.getName();
        String userId = userRepository.findByPhoneNumber(phoneNumber).map(User::getId).orElse(null);
        if (userId == null) {
            return ResponseEntity.badRequest().build();
        }

        EmergencyContact contact = new EmergencyContact(
            userId,
            request.get("phoneNumber"),
            request.get("name"),
            request.get("relationship")
        );
        return ResponseEntity.ok(contactRepository.save(contact));
    }

@PutMapping("/{id}")
    public ResponseEntity<EmergencyContact> updateContact(@PathVariable String id, @Valid @RequestBody Map<String, Object> request, Authentication auth) {
        // Minimal update logic (toggle active, update fields)
        EmergencyContact contact = contactRepository.findById(id).orElse(null);
        if (contact == null || !contact.getUserId().equals(userRepository.findByPhoneNumber(auth.getName()).map(User::getId).orElse(null))) {
            return ResponseEntity.notFound().build();
        }
        if (request.containsKey("isActive")) contact.setActive((Boolean) request.get("isActive"));
        if (request.containsKey("name")) contact.setName((String) request.get("name"));
        if (request.containsKey("phoneNumber")) contact.setPhoneNumber((String) request.get("phoneNumber"));
        if (request.containsKey("relationship")) contact.setRelationship((String) request.get("relationship"));
        return ResponseEntity.ok(contactRepository.save(contact));
    }

@DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable String id, Authentication auth) {
        EmergencyContact contact = contactRepository.findById(id).orElse(null);
        if (contact == null || !contact.getUserId().equals(userRepository.findByPhoneNumber(auth.getName()).map(User::getId).orElse(null))) {
            return ResponseEntity.notFound().build();
        }
        contact.setActive(false);
        contactRepository.save(contact);
        return ResponseEntity.ok().build();
    }
}
