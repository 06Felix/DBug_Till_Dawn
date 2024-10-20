package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.InstaPostAnalytics;

public interface InstaPostAnalyticsRepo extends JpaRepository<InstaPostAnalytics, Long>{
    
}
