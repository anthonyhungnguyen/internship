package com.example.vng.service;

import com.example.vng.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

@Service
public class DeviceService {
    private final DeviceRepository deviceRepository;

    @Autowired
    public DeviceService(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    public List<Map<String, Object>> getCardOverview(Map<String, Object> body) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("id", "deviceid/" + body.get("id"));
        return deviceRepository.getCardOverview(bindVars);
    }

    public List<Map<String, Object>> getAccountOverview(Map<String, Object> body) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("id", "deviceid/" + body.get("id"));
        return deviceRepository.getAccountOverview(bindVars);
    }
}
