package com.example.backend_exam.repository;

import com.example.backend_exam.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITripRepo extends JpaRepository<Trip,Integer> {
    
}
