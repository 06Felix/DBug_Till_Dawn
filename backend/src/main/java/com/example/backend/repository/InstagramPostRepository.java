package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.InstagramPost;

public interface InstagramPostRepository extends JpaRepository<InstagramPost, Long>{
    
}
