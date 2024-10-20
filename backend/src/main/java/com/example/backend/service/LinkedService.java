package com.example.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.InstagramPost;
import com.example.backend.model.LinkedInPost;
import com.example.backend.model.LinkedInPostAnalytics;
import com.example.backend.repository.LinkedInPostRepo;

@Service
public class LinkedService {
    @Autowired
    private LinkedInPostRepo linkedInPostRepo;

    public boolean saveAnalyticsData(String caption, int reactionCount, int likeCount, int praiseCount, int commentCount, int empathyCount, String timestamp, String imageUrl) {
       List<LinkedInPost> posts = linkedInPostRepo.findAll();
        for (LinkedInPost ip : posts) {
            if (ip.getAnalyticsData() != null && !ip.getAnalyticsData().isEmpty() &&
                ip.getAnalyticsData().get(0).getCaption() != null &&
                ip.getAnalyticsData().get(0).getCaption().equals(caption)) {
                ip.getAnalyticsData().add(new LinkedInPostAnalytics(null, reactionCount, commentCount, empathyCount, praiseCount, empathyCount, timestamp, imageUrl, caption, ip));
                try {
                    linkedInPostRepo.save(ip);
                } catch (Exception e) {
                    System.err.println("Error saving post: " + e.getMessage());
                    return false;
                }
                return true;
            }
        }
        LinkedInPost newPost = new LinkedInPost(null, null, new ArrayList<>());
        LinkedInPostAnalytics anal = new LinkedInPostAnalytics(null, reactionCount, commentCount, empathyCount, praiseCount, empathyCount, timestamp, imageUrl, caption, newPost);
        newPost.getAnalyticsData().add(anal);
        try {
            linkedInPostRepo.save(newPost);
        } catch (Exception e) {
            System.err.println("Error saving new post: " + e.getMessage());
            return false;
        }
        
        System.out.println("Hello");
        return false;
    }  
     public List<LinkedInPost> getAllInstagramPosts() {
        return linkedInPostRepo.findAll();
    }
  

}
