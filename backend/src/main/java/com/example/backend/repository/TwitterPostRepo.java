package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.TwitterPost;

public interface TwitterPostRepo extends JpaRepository<TwitterPost, Long>{
    
}
