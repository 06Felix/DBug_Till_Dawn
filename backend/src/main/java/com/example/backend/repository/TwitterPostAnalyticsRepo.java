package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.TwitterPostAnalytics;

public interface TwitterPostAnalyticsRepo extends JpaRepository<TwitterPostAnalytics, Long>{
    
}
