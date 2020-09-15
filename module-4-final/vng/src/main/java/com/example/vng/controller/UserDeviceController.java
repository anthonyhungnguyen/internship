package com.example.vng.controller;

import com.example.vng.model.Merchant;
import com.example.vng.service.UserDeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserDeviceController {
    private final UserDeviceService userDeviceService;

    @Autowired
    public UserDeviceController(UserDeviceService userDeviceService) {
        this.userDeviceService = userDeviceService;
    }

    @GetMapping("user_device/device/{id}/timestamps")
    public List<String> getDeviceTimestampsById(@PathVariable("id") String id) {
        return userDeviceService.getDeviceTimestampsById(id);
    }

    @GetMapping("user_device/device_users/{id}/connections")
    public List<Map<String, String>> getAllDevicesUsedByUsersThatUseDevice(@PathVariable("id") String id) {
        return userDeviceService.getAllDevicesUsedByUsersThatUseDevice(id);
    }

    @GetMapping("user_device/user/{id}/connections")
    public List<Map<String, String>> getDevicesRelatedToUsers(@PathVariable("id") String id) {
        return userDeviceService.getDevicesRelatedToUser(id);
    }

    @GetMapping("user_device/device/{id}/connections")
    public List<Map<String, String>> getUsersRelatedToDevice(@PathVariable("id") String id) {
        return userDeviceService.getUsersRelatedToDevice(id);
    }

    @GetMapping("user_device/device/{id}/merchant")
    public List<Merchant> getMerchantCountByDeviceId(@PathVariable("id") String id) {
        return userDeviceService.getMerchantCountByDeviceId(id);
    }
}
