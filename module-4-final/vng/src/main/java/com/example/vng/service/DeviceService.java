package com.example.vng.service;

import com.example.vng.model.Device;
import com.example.vng.repository.DeviceRepository;
import com.example.vng.repository.UserDeviceRepository;
import com.example.vng.utilities.TimestampConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Service
public class DeviceService {
    private final DeviceRepository deviceRepository;
    private final TimestampConverter timestampConverter;

    @Autowired
    public DeviceService(DeviceRepository deviceRepository,
            TimestampConverter timestampConverter) {
        this.deviceRepository = deviceRepository;
        this.timestampConverter = timestampConverter;
    }

    public Device findDeviceById(String id) {
        Device device = deviceRepository.findById("devices/" + id).orElse(null);
        if (device != null) {
            String timestampConverted =
                    timestampConverter.convertTimestamp(device.getTimestamp());
            device.setTimestamp(timestampConverted);
        }
        return device;
    }

}
