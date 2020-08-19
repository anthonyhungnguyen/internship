package com.example.demo.service;

import com.example.demo.model.Bank;
import com.example.demo.model.BankSuccess;
import com.example.demo.repository.BankRepository;
import com.example.demo.repository.BankSuccessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BankService {

    private final BankSuccessRepository bankSuccessRepository;
    private final BankRepository bankRepository;

    @Autowired
    public BankService(BankSuccessRepository bankSuccessRepository, BankRepository bankRepository) {
        this.bankSuccessRepository = bankSuccessRepository;
        this.bankRepository = bankRepository;
    }

    public List<Bank> getAllBanks() {
        return bankRepository.findAll();
    }

    public List<BankSuccess> getBankSuccessById(String id) {
        return bankSuccessRepository.findAllByBankCode(id);
    }

    public Bank getBankById(String id) {
        return bankRepository.findById(id).orElse(null);
    }
}
