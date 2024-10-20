package com.example.backend.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TwitterPost {
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

    @ManyToOne

    @JoinColumn(name = "social_media_account_id")
    private SocialMediaAccount socialMediaAccount;
}