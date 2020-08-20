package com.example.demo.repository;

import com.example.demo.model.Bank;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * The interface Bank repository.
 */
public interface BankRepository extends JpaRepository<Bank, String> {

}
