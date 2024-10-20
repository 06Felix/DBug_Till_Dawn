package com.example.backend.controller;

import java.net.MalformedURLException;
import java.util.List;

import org.apache.tomcat.util.file.ConfigurationSource.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.InstagramPost;
import com.example.backend.service.InstagramService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class InstagramController {
    @Autowired
    private InstagramService instagramService;

    @PostMapping("/postAnalytics")
    public ResponseEntity<?> postAnalytics(@RequestParam int likeCount,
        @RequestParam String caption,
        @RequestParam int commentCount,
        @RequestParam int playCount,
        @RequestParam String timestamp,
        @RequestParam String imageUrl){
        try{
            System.out.println(likeCount);
            instagramService.postInstagram(likeCount, caption, commentCount, playCount, timestamp, imageUrl);
            return ResponseEntity.status(200).body(null);
        }
        catch(Exception e){
            return ResponseEntity.status(500).body(e);
        }
    }
    @GetMapping("/getAllPosts")
    public ResponseEntity<List<InstagramPost>> getAllInstagramPosts() {
        return ResponseEntity.status(200).body(instagramService.getAllInstagramPosts());
    }
    @GetMapping("/proxy-image")
    public ResponseEntity<Resource> getImage(@RequestParam String url) {
        try {
            // Fetch the image from the given URL
            UrlResource resource = new UrlResource(url);

            // Check if the resource exists
            if (!resource.exists()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            // Return the image resource with the appropriate headers
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_TYPE, "image/jpeg"); // Set appropriate content type if known
            return new ResponseEntity(resource, headers, HttpStatus.OK);
        } catch (MalformedURLException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
    


}
