package com.example.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.InstaPostAnalytics;
import com.example.backend.model.InstagramPost;
import com.example.backend.repository.InstagramPostRepository;


@Service
public class InstagramService {
    @Autowired
    private InstagramPostRepository instagramPostRepository;

    public Boolean postInstagram(int likeCount,String caption,int commentCount,int playCount,String timestamp,String imageUrl) {
        List<InstagramPost> posts = instagramPostRepository.findAll();
        for (InstagramPost ip : posts) {
            if (ip.getAnalyticsData() != null && !ip.getAnalyticsData().isEmpty() &&
                ip.getAnalyticsData().get(0).getCaption() != null &&
                ip.getAnalyticsData().get(0).getCaption().equals(caption)) {
                ip.getAnalyticsData().add(new InstaPostAnalytics(null, likeCount, caption, commentCount, playCount, timestamp, imageUrl, ip));
                try {
                    instagramPostRepository.save(ip);
                } catch (Exception e) {
                    System.err.println("Error saving post: " + e.getMessage());
                    return false;
                }
                return true;
            }
        }
        
        InstagramPost newPost = new InstagramPost(null, null, new ArrayList<>());
        InstaPostAnalytics anal = new InstaPostAnalytics(null, likeCount, caption, commentCount, playCount, timestamp, imageUrl, newPost);
        
        newPost.getAnalyticsData().add(anal);
        try {
            instagramPostRepository.save(newPost);
        } catch (Exception e) {
            System.err.println("Error saving new post: " + e.getMessage());
            return false;
        }
        
        System.out.println("Hello");
        return false;
    }
    public List<InstagramPost> getAllInstagramPosts() {
        return instagramPostRepository.findAll();
    }



}
