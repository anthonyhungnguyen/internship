package com.example.vng.controller;

import com.example.vng.model.Device;
import com.example.vng.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class DeviceController {

    public final DeviceService deviceService;

    @Autowired
    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @GetMapping(path = "device/{id}")
    public Device findDeviceById(@PathVariable("id") String id) throws Exception {
        Device device = deviceService.findDeviceById(id);
        if (device != null) {
            return device;
        } else {
            throw new Exception(String.format("Device: %s not found", id));
        }
    }
}
