package com.example.vng.service;

import com.example.vng.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
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
}
