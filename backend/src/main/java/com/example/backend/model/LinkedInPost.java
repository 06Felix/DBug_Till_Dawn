package com.example.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LinkedInPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "social_media_account_id")
    private SocialMediaAccount socialMediaAccount;

    @OneToMany(mappedBy = "linkedInPost", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<LinkedInPostAnalytics> analyticsData; 
}
