package com.example.vng.service;

import com.example.vng.model.Device;
import com.example.vng.repository.DeviceRepository;
import com.example.vng.repository.UserDeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Service
public class DeviceService {
    private final DeviceRepository deviceRepository;
    private final UserDeviceRepository userDeviceRepository;
    private final ZoneId zoneId = ZoneId.of("Asia/Ho_Chi_Minh");

    @Autowired
    public DeviceService(DeviceRepository deviceRepository, UserDeviceRepository userDeviceRepository) {
        this.deviceRepository = deviceRepository;
        this.userDeviceRepository = userDeviceRepository;
    }

    public Device findDeviceById(String id) {
        Device device = deviceRepository.findById(id).orElse(null);
        if (device != null) {
            LocalDateTime localDateTime = LocalDateTime.ofInstant(Instant.ofEpochSecond(Long.parseLong(device.getTimestamp())), zoneId);
            device.setTimestamp(localDateTime.toString());
        }
        return device;
    }
}
