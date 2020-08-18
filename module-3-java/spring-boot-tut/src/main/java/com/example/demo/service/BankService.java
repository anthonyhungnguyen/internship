package com.example.demo.service;

import com.example.demo.dao.BankDao;
import com.example.demo.dao.BankSuccessDao;
import com.example.demo.model.Bank;
import com.example.demo.model.BankSuccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BankService {

    private final BankSuccessDao bankSuccessDao;
    private final BankDao bankDao;

    @Autowired
    public BankService(BankSuccessDao bankSuccessDao, BankDao bankDao) {
        this.bankSuccessDao = bankSuccessDao;
        this.bankDao = bankDao;
    }

    public List<Bank> getAllBanks() {
        return bankDao.findAll();
    }

    public List<BankSuccess> getAllBankSuccess() {
        return bankSuccessDao.findAll();
    }

    public List<BankSuccess> getBankSuccessById(String id) {
        return bankSuccessDao.getBankSuccessById(id);
    }
}
