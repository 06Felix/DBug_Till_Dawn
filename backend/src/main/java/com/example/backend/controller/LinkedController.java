package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.InstagramPost;
import com.example.backend.model.LinkedInPost;
import com.example.backend.service.LinkedService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class LinkedController {
    @Autowired
    private LinkedService linkedService;

    @PostMapping("/linkedPostAnalytics")
    public ResponseEntity<?> postAnalytics(
            @RequestParam String caption,
            @RequestParam int reactionCount,
            @RequestParam int likeCount,
            @RequestParam int praiseCount,
            @RequestParam int commentCount,
            @RequestParam int empathyCount,
            @RequestParam String timestamp,
            @RequestParam String imageUrl) {
        try {
            System.out.println(likeCount + " " + commentCount);
            linkedService.saveAnalyticsData(caption, reactionCount, likeCount, praiseCount, commentCount, empathyCount, timestamp, imageUrl);
            return ResponseEntity.status(200).body("Analytics data successfully saved!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error saving analytics data: " + e.getMessage());
        }
    }
     @GetMapping("/getAllLinkPosts")
    public ResponseEntity<List<LinkedInPost>> getAllInstagramPosts() {
        return ResponseEntity.status(200).body(linkedService.getAllInstagramPosts());
    }
    
}
