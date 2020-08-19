package com.example.demo.repository;

import com.example.demo.model.BankSuccess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BankSuccessRepository extends JpaRepository<BankSuccess, String> {
    List<BankSuccess> findAllByBankCode(String bankCode);
}
