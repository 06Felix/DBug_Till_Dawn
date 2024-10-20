package com.example.backend.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SocialMediaAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @OneToMany(mappedBy = "socialMediaAccount")
    private List<InstagramPost> instagramPosts;

    @OneToMany(mappedBy = "socialMediaAccount")
    private List<LinkedInPost> linkedInPosts;

    @OneToMany(mappedBy = "socialMediaAccount")
    private List<TwitterPost> twitterPosts;
}