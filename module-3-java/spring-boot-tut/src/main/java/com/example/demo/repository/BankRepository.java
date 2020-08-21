package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Bank;

/**
 * The interface Bank repository.
 */
public interface BankRepository extends JpaRepository<Bank, String> {

}
