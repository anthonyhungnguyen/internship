package com.example.vng.controller;

import com.example.vng.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/profile/user")
public class UserController {
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("info")
    public Map<String, Object> getUserInfo(@RequestBody Map<String, Object> body) {
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

    @PostMapping("card/overview")
    public List<Map<String, Object>> getCardOverview(@RequestBody Map<String, Object> body) {
        body.put("id", "userid/" + body.get("id"));
        return userRepository.getCardOverview(body);
    }

    @PostMapping("account/overview")
    public List<Map<String, Object>> getAccountOverview(@RequestBody Map<String, Object> body) {
        body.put("id", "userid/" + body.get("id"));
        return userRepository.getAccountOverview(body);
    }

    @PostMapping("card/mapping/overview")
    public List<Map<String, Object>> getCardMappingOverview(@RequestBody Map<String, Object> body) {
        body.put("@col", "map_card");
        return userRepository.getMappingOverview(body);
    }

    @PostMapping("card/mapping/timeline")
    public List<Map<String, Object>> getCardMappingTimeline(@RequestBody Map<String, Object> body) {
        body.put("@col", "map_card");
        return userRepository.getMappingTimeline(body);
    }

    @PostMapping("card/mapping/bank")
    public List<Map<String, Object>> getCardMappingBank(@RequestBody Map<String, Object> body) {
        body.put("@col", "map_card");
        return userRepository.getMappingBank(body);
    }

    @PostMapping("account/mapping/overview")
    public List<Map<String, Object>> getAccountMappingOverview(@RequestBody Map<String, Object> body) {
        body.put("@col", "map_account");
        return userRepository.getMappingOverview(body);
    }

    @PostMapping("account/mapping/timeline")
    public List<Map<String, Object>> getAccountMappingTimeline(@RequestBody Map<String, Object> body) {
        body.put("@col", "map_account");
        return userRepository.getMappingTimeline(body);
    }

    @PostMapping("account/mapping/bank")
    public List<Map<String, Object>> getAccountMappingBank(@RequestBody Map<String, Object> body) {
        return userRepository.getMappingBank(body);
    }

    @PostMapping("mapping/overview")
    public Map<String, Object> getMappingStatisticsOverview(@RequestBody Map<String, Object> body) {
        return userRepository.getMappingStatisticsOverview(body);
    }

    @PostMapping("monetary/overview")
    public Map<String, Object> getSpendingStatisticsOverview(@RequestBody Map<String, Object> body) {
        return userRepository.getSpendingStatisticsOverview(body);
    }

    @PostMapping("monetary/overview/frequency")
    public Map<String, Object> getSpendingFrequencyOverview(@RequestBody Map<String, Object> body) {
        return userRepository.getSpendingFrequencyOverview(body);
    }
}
