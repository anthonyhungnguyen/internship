package com.example.vng.controller;

import com.example.vng.model.CustomQuery;
import com.example.vng.service.UserDeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
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
    public List<Map<String, Object>> getDeviceTimestampsById(@PathVariable("id") String id) {
        return userDeviceService.getDeviceTimestampsById(id);
    }

    @GetMapping("user_device/device_users/{id}/connections/{depth}")
    public List<Map<String, String>> getAllDevicesUsedByUsersThatUseDevice(@PathVariable("id") String id, @PathVariable("depth") String depth) {
        return userDeviceService.getAllDevicesUsedByUsersThatUseDevice(id, depth);
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
    public List<Map<String, Object>> getMerchantCountByDeviceId(@PathVariable("id") String id) {
        return userDeviceService.getMerchantCountByDeviceId(id);
    }

    @GetMapping("user_device/device/{id}/spending")
    public List<Map<String, Object>> getSpendingFrequencyByDeviceId(@PathVariable("id") String id) {
        return userDeviceService.getSpendingFrequencyByDeviceId(id);
    }

    @GetMapping("user_device/device/{id}/geolocation")
    public List<Map<String, Object>> getGeolocationActivity(@PathVariable("id") String id) {
        return userDeviceService.getGeolocationActivity(id);
    }

    @PostMapping("user_device/device_users/moreDepth")
    public List<Map<String, String>> getNextDepth(@RequestBody List<String> deviceList) {
        return userDeviceService.getNextDepth(deviceList);
    }

    @PostMapping("user_device/test")
    public ArrayList<Object> getDynamicQuery(@RequestBody CustomQuery customQuery) {
        return userDeviceService.getDynamicQuery(customQuery);
    }
}
