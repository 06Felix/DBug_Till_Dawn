package com.example.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TwitterPostAnalytics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int likesCount;
    private int retweetsCount;
    private int viewsCount;
    private int bookmarkCount;
    private int favouriteCount;
    private int replyCount;
    private int quoteCount;
    private LocalDateTime timestamp; 
    private String imageUrl; 
    private String caption;

    @ManyToOne
    @JoinColumn(name = "twitter_post_id")
    private TwitterPost twitterPost; 
}
