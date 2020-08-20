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

/**
 * The type Bank controller.
 */
@RequestMapping("api/bank")
@RestController
public class BankController {

    @Autowired
    private BankService bankService;

    /**
     * Gets all banks.
     *
     * @return the all banks
     */
    @GetMapping
    public List<Bank> getAllBanks() {
        return bankService.getAllBanks();
    }

    /**
     * Gets bank success by id.
     *
     * @param id the id
     * @return the bank success by id
     * @throws Exception the exception when bank id not found
     */
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
