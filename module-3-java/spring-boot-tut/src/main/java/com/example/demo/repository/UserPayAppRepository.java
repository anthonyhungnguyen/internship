package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.UserPayApp;

/**
 * The interface User pay app repository.
 */
@Repository
public interface UserPayAppRepository extends JpaRepository<UserPayApp, String> {
	/**
	 * Find all by user id list.
	 *
	 * @param id
	 *            the id
	 * @return the list
	 */
	List<UserPayApp> findAllByUserId(String id);
}
