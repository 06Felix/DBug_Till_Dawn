package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LinkedInPostAnalytics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int reactionCount;
    private int likesCount;
    private int empathyCount;
    private int praiseCount;
    private int commentsCount;
    private String timestamp; 
    private String imageUrl; 
    private String caption;

    @ManyToOne
    @JoinColumn(name = "linkedin_post_id")
    @JsonBackReference
    private LinkedInPost linkedInPost;
}
