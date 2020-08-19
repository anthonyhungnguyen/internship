package com.example.demo.api;

import com.example.demo.model.Bank;
import com.example.demo.model.BankSuccess;
import com.example.demo.service.BankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotBlank;
import java.util.List;

@RequestMapping("api/bank")
@RestController
public class BankController {

    private final BankService bankService;

    @Autowired
    public BankController(BankService bankService) {
        this.bankService = bankService;
    }

    @GetMapping
    public List<Bank> getAllBanks() {
        List<Bank> allBanks = bankService.getAllBanks();
        return allBanks;
    }

    @GetMapping(path = "{id}")
    public List<BankSuccess> getBankSuccessById(@NotBlank @PathVariable("id") String id) throws Exception {
        Bank bank = bankService.getBankById(id);
        if (bank == null) {
            throw new Exception("Bank Not Found");
        } else {
            return bankService.getBankSuccessById(id);
        }

    }
}
