package com.example.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class InstaPostDto {
    private int likeCount;
    private String caption;
    private int commentCount;
    private int playCount;
    private String timestamp;
    private String imageUrl;

}
