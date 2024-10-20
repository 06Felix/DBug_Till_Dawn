
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
public class InstaPostAnalytics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int likesCount;
    private String caption;
    @Column(name = "comments_count")
    private int commentsCount;
    private int viewsCount;
    private String timestamp; 
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "instagram_post_id")
    @JsonBackReference
    private InstagramPost instagramPost; 
}