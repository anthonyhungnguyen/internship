package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.UserRFM;

/**
 * The interface User rfm repository.
 */
@Repository
public interface UserRFMRepository extends JpaRepository<UserRFM, String> {
	/**
	 * Find by user id user rfm.
	 *
	 * @param id
	 *            the id
	 * @return the user rfm
	 */
	UserRFM findByUserId(String id);
}
