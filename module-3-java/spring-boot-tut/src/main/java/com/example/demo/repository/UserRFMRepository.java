package com.example.demo.repository;

import com.example.demo.model.UserRFM;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRFMRepository extends JpaRepository<UserRFM, String> {
    UserRFM findByUserId(String id);
}
