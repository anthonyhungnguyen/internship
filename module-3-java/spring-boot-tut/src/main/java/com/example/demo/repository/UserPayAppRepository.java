package com.example.demo.dao;

import com.example.demo.model.UserPayApp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserPayAppDao extends JpaRepository<UserPayApp, String> {
    @Query("SELECT t FROM UserPayApp t WHERE t.user_id = :id")
    List<UserPayApp> getUserPayAppByUserId(String id);
}
