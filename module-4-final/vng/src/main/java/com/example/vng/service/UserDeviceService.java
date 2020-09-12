package com.example.vng.service;

import com.example.vng.repository.UserDeviceRepository;
import com.example.vng.utilities.TimestampConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class UserDeviceService {

    private final UserDeviceRepository userDeviceRepository;
    private final TimestampConverter timestampConverter;

    @Autowired
    public UserDeviceService(UserDeviceRepository userDeviceRepository,
            TimestampConverter timestampConverter) {
        this.userDeviceRepository = userDeviceRepository;
        this.timestampConverter = timestampConverter;
    }

    public List<String> getDeviceTimestampsById(String id) {
        List<String> deviceTimestamps =
                userDeviceRepository.findDeviceTimestamp("devices/" + id);
        return deviceTimestamps.stream().map(timestampConverter::convertTimestamp).collect(Collectors.toList());
    }

    public List<Map<String, String>> getAllDevicesUsedByUsersThatUseDevice(String id) {
        return userDeviceRepository.findMultipleUsersDevicesDepth2("devices/" + id);
    }

    public List<Map<String, String>> getDevicesRelatedToUser(String id) {
        return userDeviceRepository.findDevicesRelatedToUsers("users/" + id);
    }

    public List<Map<String, String>> getUsersRelatedToDevice(String id) {
        return userDeviceRepository.findUsersRelatedToDevices("devices/" + id);
    }
}
