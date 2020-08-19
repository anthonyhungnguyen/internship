package com.example.demo.repository;

import com.example.demo.model.UserPayApp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserPayAppRepository extends JpaRepository<UserPayApp, String> {
    List<UserPayApp> findAllByUserId(String id);
}
