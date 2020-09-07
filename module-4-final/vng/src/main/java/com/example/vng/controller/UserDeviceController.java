package com.example.vng.controller;

import com.example.vng.service.UserDeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserDeviceController {
    private final UserDeviceService userDeviceService;

    @Autowired
    public UserDeviceController(UserDeviceService userDeviceService) {
        this.userDeviceService = userDeviceService;
    }

    @GetMapping("user_device/{id}")
    public List<String> getAllUserDeviceById(@PathVariable("id") String id) {
        return userDeviceService.getAllDevicesById(id);
    }
}
