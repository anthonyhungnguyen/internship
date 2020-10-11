package com.example.vng.controller;

import com.example.vng.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/profile/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("info")
    public Map<String, Object> getUserInfo(@RequestBody Map<String, Object> body) {
        return userService.getUserInfo(body);
    }

    @PostMapping("card/overview")
    public List<Map<String, Object>> getCardOverview(@RequestBody Map<String, Object> body) {
        return userService.getCardOverview(body);
    }

    @PostMapping("account/overview")
    public List<Map<String, Object>> getAccountOverview(@RequestBody Map<String, Object> body) {
        return userService.getAccountOverview(body);
    }

    @PostMapping("card/mapping/overview")
    public List<Map<String, Object>> getCardMappingOverview(@RequestBody Map<String, Object> body) {
        return userService.getCardMappingOverview(body);
    }

    @PostMapping("card/mapping/timeline")
    public List<Map<String, Object>> getCardMappingTimeline(@RequestBody Map<String, Object> body) {
        return userService.getCardMappingTimeline(body);
    }

    @PostMapping("card/mapping/bank")
    public List<Map<String, Object>> getCardMappingBank(@RequestBody Map<String, Object> body) {
        return userService.getCardMappingBank(body);
    }

    @PostMapping("account/mapping/overview")
    public List<Map<String, Object>> getAccountMappingOverview(@RequestBody Map<String, Object> body) {
        return userService.getAccountMappingOverview(body);
    }

    @PostMapping("account/mapping/timeline")
    public List<Map<String, Object>> getAccountMappingTimeline(@RequestBody Map<String, Object> body) {
        return userService.getAccountMappingTimeline(body);
    }

    @PostMapping("account/mapping/bank")
    public List<Map<String, Object>> getAccountMappingBank(@RequestBody Map<String, Object> body) {
        return userService.getAccountMappingBank(body);
    }

    @PostMapping("mapping/overview")
    public Map<String, Object> getMappingStatisticsOverview(@RequestBody Map<String, Object> body) {
        return userService.getMappingStatisticsOverview(body);
    }

    @PostMapping("monetary/overview")
    public Map<String, Object> getSpendingStatisticsOverview(@RequestBody Map<String, Object> body) {
        return userService.getSpendingStatisticsOverview(body);
    }

    @PostMapping("monetary/overview/frequency")
    public Map<String, Object> getSpendingFrequencyOverview(@RequestBody Map<String, Object> body) {
        return userService.getSpendingFrequencyOverview(body);
    }
}
