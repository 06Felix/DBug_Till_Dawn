package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.SocialMediaAccount;

public interface SocialMediaAccountRepo extends JpaRepository<SocialMediaAccount, Long>{
    
}
