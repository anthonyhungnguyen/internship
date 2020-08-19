package com.example.demo.dao;

import com.example.demo.model.BankSuccess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BankSuccessDao extends JpaRepository<BankSuccess, String> {
    List<BankSuccess> findByBank_code(String bankCode);
}
