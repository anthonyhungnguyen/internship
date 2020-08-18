package com.example.demo.service;

import com.example.demo.dao.BankSuccessDao;
import com.example.demo.model.BankSuccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BankService {

    private final BankSuccessDao bankSuccessDao;

    @Autowired
    public BankService(BankSuccessDao bankSuccessDao) {
        this.bankSuccessDao = bankSuccessDao;
    }

    public List<BankSuccess> getAllBankSuccess() {
        return bankSuccessDao.findAll();
    }

    public List<BankSuccess> getBankSuccessById(String id) {
        return bankSuccessDao.findAll().stream()
                .filter((b) -> b.getBank_code().equals(id))
                .collect(Collectors.toList());
    }
}
