package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.BankSuccess;

/**
 * The interface Bank success repository.
 */
@Repository
public interface BankSuccessRepository extends JpaRepository<BankSuccess, String> {
	/**
	 * Find all by bank code list.
	 *
	 * @param bankCode
	 *            the bank code
	 * @return the list
	 */
	List<BankSuccess> findAllByBankCode(String bankCode);
}
