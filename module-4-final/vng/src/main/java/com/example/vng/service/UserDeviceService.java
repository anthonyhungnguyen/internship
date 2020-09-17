package com.example.vng.service;

import com.example.vng.repository.TPERepository;
import com.example.vng.repository.UserDeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserDeviceService {

    private final UserDeviceRepository userDeviceRepository;
    private final TPERepository tpeRepository;

    @Autowired
    public UserDeviceService(UserDeviceRepository userDeviceRepository,
                             TPERepository tpeRepository) {
        this.userDeviceRepository = userDeviceRepository;
        this.tpeRepository = tpeRepository;
    }

    public List<Map<String, Object>> getDeviceTimestampsById(String id) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("deviceId", "devices/" + id);
        bindVars.put("type", "user_use_device");
        bindVars.put("date_add_type", "hour");
        bindVars.put("date_format", "%dd-%mm-%yyyy");
        return userDeviceRepository.findDeviceTimestamp(bindVars);
    }

    public List<Map<String, String>> getAllDevicesUsedByUsersThatUseDevice(String id, String depth) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("deviceId", "devices/" + id);
        bindVars.put("type", "user_use_device");
        bindVars.put("depth", Integer.valueOf(depth));
        return userDeviceRepository.findMultipleUsersDevicesDepth(bindVars);
    }

    public List<Map<String, String>> getDevicesRelatedToUser(String id) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("userId", "users/" + id);
        bindVars.put("type", "user_use_device");
        return userDeviceRepository.findDevicesRelatedToUsers(bindVars);
    }

    public List<Map<String, String>> getUsersRelatedToDevice(String id) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("deviceId", "devices/" + id);
        bindVars.put("type", "user_use_device");
        return userDeviceRepository.findUsersRelatedToDevices(bindVars);
    }

    public List<Map<String, Object>> getMerchantCountByDeviceId(String id) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("deviceId", "devices/" + id);
        bindVars.put("type", "transaction");
        return tpeRepository.getMerchantCountByDeviceId(bindVars);
    }

    public List<Map<String, Object>> getSpendingFrequencyByDeviceId(String id) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("deviceId", "devices/" + id);
        bindVars.put("type", "transaction");
        bindVars.put("transType", "Money Transfer");
        bindVars.put("dateFormat", "%dd-%mm-%yyyy");
        return tpeRepository.getSpendingFrequencyByDeviceId(bindVars);
    }

    public List<Map<String, Object>> getGeolocationActivity(String id) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("deviceId", "devices/" + id);
        bindVars.put("type", "transaction");
        bindVars.put("cond", "0.0");
        return tpeRepository.getGeolocationActivity(bindVars);
    }
}
