package com.example.demo.api;

import com.example.demo.model.BankSuccess;
import com.example.demo.service.BankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("api/bank")
@RestController
public class BankSuccessController {

    private final BankService bankService;

    @Autowired
    public BankSuccessController(BankService bankService) {
        this.bankService = bankService;
    }

    @GetMapping
    public List<BankSuccess> getAll() {
        return bankService.getAllBankSuccess();
    }

    @GetMapping(path = "{id}")
    public List<BankSuccess> getBankSuccessById(@PathVariable("id") String id) {
        return bankService.getBankSuccessById(id);
    }
}
