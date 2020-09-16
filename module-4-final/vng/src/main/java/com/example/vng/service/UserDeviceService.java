package com.example.vng.service;

import com.example.vng.model.DeviceSpending;
import com.example.vng.model.Merchant;
import com.example.vng.repository.TPERepository;
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
    private final TPERepository tpeRepository;
    private final TimestampConverter timestampConverter;

    @Autowired
    public UserDeviceService(UserDeviceRepository userDeviceRepository,
                             TPERepository tpeRepository, TimestampConverter timestampConverter) {
        this.userDeviceRepository = userDeviceRepository;
        this.tpeRepository = tpeRepository;
        this.timestampConverter = timestampConverter;
    }

    public List<String> getDeviceTimestampsById(String id) {
        List<String> deviceTimestamps =
                userDeviceRepository.findDeviceTimestamp("devices/" + id, "user_use_device");
        return deviceTimestamps.stream().map(timestampConverter::convertTimestamp).collect(Collectors.toList());
    }

    public List<Map<String, String>> getAllDevicesUsedByUsersThatUseDevice(String id) {
        return userDeviceRepository.findMultipleUsersDevicesDepth2("devices/" + id, "user_use_device");
    }

    public List<Map<String, String>> getDevicesRelatedToUser(String id) {
        return userDeviceRepository.findDevicesRelatedToUsers("users/" + id, "user_use_device");
    }

    public List<Map<String, String>> getUsersRelatedToDevice(String id) {
        return userDeviceRepository.findUsersRelatedToDevices("devices/" + id, "user_use_device");
    }

    public List<Merchant> getMerchantCountByDeviceId(String id) {
        return tpeRepository.getMerchantCountByDeviceId("devices/" + id, "transaction");
    }

    public List<DeviceSpending> getSpendingFrequencyByDeviceId(String id) {
        return tpeRepository.getSpendingFrequencyByDeviceId("devices/" + id,
                "transaction", "Money Transfer",  "%dd-%mm-%yyyy");
    }

    public List<Map<String, String>> getGeolocationActivity(String id) {
        return tpeRepository.getGeolocationActivity("devices/" + id,
                "transaction", "0.0");
    }
}
