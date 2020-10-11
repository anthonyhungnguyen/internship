package com.example.vng.service;

import com.example.vng.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Map<String, Object> getUserInfo(Map<String, Object> body) {
        List<String> list = Stream.of( "profilelevel",
                "acquital_result",
                "postmortem_add_date",
                "postmortem_result",
                "avatar",
                "birthdate",
                "displayname",
                "isLocked",
                "kycdob",
                "kycfullname",
                "kycgender",
                "phonenumber",
                "usergender",
                "zaloid").collect(Collectors.toList());
        body.put("keepList", list);
        return userRepository.getUserInfo(body);
    }

    public List<Map<String, Object>> getCardOverview(Map<String, Object> body) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("id", "userid/" + body.get("id"));
        return userRepository.getCardOverview(bindVars);
    }

    public List<Map<String, Object>> getAccountOverview(Map<String, Object> body) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("id", "userid/" + body.get("id"));
        return userRepository.getAccountOverview(bindVars);
    }

    public List<Map<String, Object>> getCardMappingOverview(Map<String, Object> body) {
        body.put("@col", "map_card");
        return userRepository.getMappingOverview(body);
    }

    public List<Map<String, Object>> getCardMappingTimeline(Map<String, Object> body) {
        body.put("@col", "map_card");
        return userRepository.getMappingTimeline(body);
    }

    public List<Map<String, Object>> getCardMappingBank(Map<String, Object> body) {
        body.put("@col", "map_card");
        return userRepository.getMappingBank(body);
    }

    public List<Map<String, Object>> getAccountMappingOverview(Map<String, Object> body) {
        body.put("@col", "map_account");
        return userRepository.getMappingOverview(body);
    }

    public List<Map<String, Object>> getAccountMappingTimeline(Map<String, Object> body) {
        body.put("@col", "map_account");
        return userRepository.getMappingTimeline(body);
    }

    public List<Map<String, Object>> getAccountMappingBank(Map<String, Object> body) {
        body.put("@col", "map_account");
        return userRepository.getMappingBank(body);
    }

    public Map<String, Object> getMappingStatisticsOverview(Map<String, Object> body) {
        return userRepository.getMappingStatisticsOverview(body);
    }

    public Map<String, Object> getSpendingStatisticsOverview(Map<String, Object> body) {
        return userRepository.getSpendingStatisticsOverview(body);
    }

    public Map<String, Object> getSpendingFrequencyOverview(Map<String, Object> body) {
        return userRepository.getSpendingFrequencyOverview(body);
    }
}
