package com.example.demo.dao;

import com.example.demo.model.Bank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BankDao extends JpaRepository<Bank, String> {

}
