package com.example.vng.service;

import com.example.vng.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
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

    public List<Map<String, Object>> getCardMappingOverview(Map<String, Object> body) {
        body.put("@col", "device_map_card");
        return deviceRepository.getMappingOverview(body);
    }

    public List<Map<String, Object>> getCardMappingTimeline(Map<String, Object> body) {
        body.put("@col", "device_map_card");
        return deviceRepository.getMappingTimeline(body);
    }

    public List<Map<String, Object>> getCardMappingBank(Map<String, Object> body) {
        body.put("@col", "device_map_card");
        return deviceRepository.getMappingBank(body);
    }

    public List<Map<String, Object>> getAccountMappingOverview(Map<String, Object> body) {
        body.put("@col", "device_map_account");
        return deviceRepository.getMappingOverview(body);
    }

    public List<Map<String, Object>> getAccountMappingTimeline(Map<String, Object> body) {
        body.put("@col", "device_map_account");
        return deviceRepository.getMappingTimeline(body);
    }

    public List<Map<String, Object>> getAccountMappingBank(Map<String, Object> body) {
        body.put("@col", "device_map_account");
        return deviceRepository.getMappingBank(body);
    }
}
