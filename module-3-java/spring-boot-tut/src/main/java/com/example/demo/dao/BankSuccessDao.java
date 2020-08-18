package com.example.demo.dao;

import com.example.demo.model.BankSuccess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BankSuccessDao extends JpaRepository<BankSuccess, String> {
}
