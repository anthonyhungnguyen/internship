package com.example.vng.controller;

import com.example.vng.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/profile/device")
public class DeviceController {
    private final DeviceRepository deviceRepository;

    @Autowired
    public DeviceController(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    @PostMapping("card/overview")
    public List<Map<String, Object>> getCardOverview(@RequestBody Map<String, Object> body) {
        body.put("id", "deviceid/" + body.get("id"));
        return deviceRepository.getCardOverview(body);
    }

    @PostMapping("account/overview")
    public List<Map<String, Object>> getAccountOverview(@RequestBody Map<String, Object> body) {
        body.put("id", "deviceid/" + body.get("id"));
        return deviceRepository.getAccountOverview(body);
    }

    @PostMapping("card/mapping/overview")
    public List<Map<String, Object>> getCardMappingOverview(@RequestBody Map<String, Object> body) {
        body.put("@col", "device_map_card");
        return deviceRepository.getMappingOverview(body);
    }

    @PostMapping("card/mapping/timeline")
    public List<Map<String, Object>> getCardMappingTimeline(@RequestBody Map<String, Object> body) {
        body.put("@col", "device_map_card");
        return deviceRepository.getMappingTimeline(body);
    }

    @PostMapping("card/mapping/bank")
    public List<Map<String, Object>> getCardMappingBank(@RequestBody Map<String, Object> body) {
        body.put("@col", "device_map_card");
        return deviceRepository.getMappingBank(body);
    }

    @PostMapping("account/mapping/overview")
    public List<Map<String, Object>> getAccountMappingOverview(@RequestBody Map<String, Object> body) {
        body.put("@col", "device_map_account");
        return deviceRepository.getMappingOverview(body);
    }

    @PostMapping("account/mapping/timeline")
    public List<Map<String, Object>> getAccountMappingTimeline(@RequestBody Map<String, Object> body) {
        body.put("@col", "device_map_account");
        return deviceRepository.getMappingTimeline(body);
    }

    @PostMapping("account/mapping/bank")
    public List<Map<String, Object>> getAccountMappingBank(@RequestBody Map<String, Object> body) {
        body.put("@col", "device_map_account");
        return deviceRepository.getMappingBank(body);
    }

    @PostMapping("mapping/overview")
    public Map<String, Object> getMappingStatisticsOverview(@RequestBody Map<String, Object> body) {
        return deviceRepository.getMappingStatisticsOverview(body);
    }

    @PostMapping("monetary/overview")
    public Map<String, Object> getSpendingStatisticsOverview(@RequestBody Map<String, Object> body) {
        return deviceRepository.getSpendingStatisticsOverview(body);
    }

    @PostMapping("monetary/overview/frequency")
    public Map<String, Object> getSpendingFrequencyOverview(@RequestBody Map<String, Object> body) {
        return deviceRepository.getSpendingFrequencyOverview(body);
    }
}
