package com.example.vng.controller;

import com.example.vng.service.DeviceService;
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
    private final DeviceService deviceService;

    @Autowired
    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @PostMapping("card/overview")
    public List<Map<String, Object>> getCardOverview(@RequestBody Map<String, Object> body) {
        return deviceService.getCardOverview(body);
    }

    @PostMapping("account/overview")
    public List<Map<String, Object>> getAccountOverview(@RequestBody Map<String, Object> body) {
        return deviceService.getAccountOverview(body);
    }

    @PostMapping("card/mapping/overview")
    public List<Map<String, Object>> getCardMappingOverview(@RequestBody Map<String, Object> body) {
        return deviceService.getCardMappingOverview(body);
    }

    @PostMapping("card/mapping/timeline")
    public List<Map<String, Object>> getCardMappingTimeline(@RequestBody Map<String, Object> body) {
        return deviceService.getCardMappingTimeline(body);
    }

    @PostMapping("card/mapping/bank")
    public List<Map<String, Object>> getCardMappingBank(@RequestBody Map<String, Object> body) {
        return deviceService.getCardMappingBank(body);
    }
}
