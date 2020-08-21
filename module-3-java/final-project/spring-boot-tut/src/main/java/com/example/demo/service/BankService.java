package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Bank;
import com.example.demo.model.BankSuccess;
import com.example.demo.repository.BankRepository;
import com.example.demo.repository.BankSuccessRepository;

/**
 * The type Bank service.
 */
@Service
public class BankService {
	@Autowired
	private BankSuccessRepository bankSuccessRepository;
	@Autowired
	private BankRepository bankRepository;

	/**
	 * Gets all banks.
	 *
	 * @return the all banks
	 */
	public List<Bank> getAllBanks() {
		return bankRepository.findAll();
	}

	/**
	 * Gets bank success by id.
	 *
	 * @param id
	 *            the id
	 * @return the bank success by id
	 */
	public List<BankSuccess> getBankSuccessById(String id) {
		return bankSuccessRepository.findAllByBankCode(id);
	}

	/**
	 * Gets bank by id.
	 *
	 * @param id
	 *            the id
	 * @return the bank by id
	 */
	public Bank getBankById(String id) {
		return bankRepository.findById(id).orElse(null);
	}
}
