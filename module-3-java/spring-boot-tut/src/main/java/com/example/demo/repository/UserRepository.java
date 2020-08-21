package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.User;

/**
 * The interface User repository.
 */
public interface UserRepository extends JpaRepository<User, String> {

}
