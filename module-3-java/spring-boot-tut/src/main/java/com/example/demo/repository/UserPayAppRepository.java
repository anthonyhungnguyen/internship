package com.example.demo.repository;

import com.example.demo.model.UserPayApp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * The interface User pay app repository.
 */
@Repository
public interface UserPayAppRepository extends JpaRepository<UserPayApp, String> {
    /**
     * Find all by user id list.
     *
     * @param id the id
     * @return the list
     */
    List<UserPayApp> findAllByUserId(String id);
}
