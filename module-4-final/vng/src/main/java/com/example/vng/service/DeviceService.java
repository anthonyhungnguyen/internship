package com.example.vng.service;

import com.example.vng.model.Device;
import com.example.vng.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeviceService {
    private final DeviceRepository deviceRepository;

    @Autowired
    public DeviceService(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    public Device findDeviceById(String id) {
        return deviceRepository.findById("devices/" + id).orElse(null);
    }

}
