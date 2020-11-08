package com.example.vng.controller;

import com.example.vng.repository.FundingChannelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;
import java.util.List;


@RestController
@RequestMapping("/api/profile/funding_channel/")
public class FundingChannelController {

    private final FundingChannelRepository fundingChannelRepository;

    @Autowired()
    public FundingChannelController(FundingChannelRepository fundingChannelRepository) {
        this.fundingChannelRepository = fundingChannelRepository;
    }

    @GetMapping("/{id}/info")
    public Map<String, Object> getInfo(@PathVariable("id") String id) {
        List<String> keepList = Arrays.asList("accountId", "cardId", "bankCode", "bankCustomerID", "bankName", "cardName", "first6CardNo", "firstAccountNo", "kycDob", "kycFullName", "kycGender", "kycIdType", "kycIdValue", "lastAccountNo", "last4CardNo", "phoneNumber", "type");
        return fundingChannelRepository.getFundingChannelInfo("funding_channel/" + id, keepList);
    }
}
