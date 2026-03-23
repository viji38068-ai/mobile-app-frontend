package com.helpvoice.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
public class RootController {

    @GetMapping("/")
    public RedirectView redirectToHealth() {
        return new RedirectView("/api/health");
    }

    @GetMapping("/status")
    public ResponseEntity<String> status() {
        return ResponseEntity.ok("HelpVoice Backend - OK");
    }
}

