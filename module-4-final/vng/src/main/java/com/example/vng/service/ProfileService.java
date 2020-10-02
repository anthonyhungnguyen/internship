package com.example.vng.service;

import com.example.vng.model.CustomQuery;
import com.example.vng.repository.*;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProfileService {
    private final DeviceRepository deviceRepository;
    private final UserRepository userRepository;
    private final MappingRepository mappingRepository;
    private final ArangoDBRepository arangoDBRepository;
    private final ArangoDBCustom arangoDBCustom;

    public ProfileService(DeviceRepository deviceRepository, UserRepository userRepository, MappingRepository mappingRepository, ArangoDBRepository arangoDBRepository, ArangoDBCustom arangoDBCustom) {
        this.deviceRepository = deviceRepository;
        this.userRepository = userRepository;
        this.mappingRepository = mappingRepository;
        this.arangoDBRepository = arangoDBRepository;
        this.arangoDBCustom = arangoDBCustom;
    }

    public List<Map<String, Object>> getDeviceInfo(Map<String, Object> body) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("id", body.get("type") + "/" + body.get("id"));
        return arangoDBRepository.getInfo(bindVars);
    }

    public List<String> getDeviceUserList(Map<String, Object> body) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("id", body.get("type") + "/" + body.get("id"));
        return deviceRepository.getUserList(bindVars);
    }

    public List<Map<String, Object>> getDeviceBasicInfo(Map<String, Object> body) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("id", body.get("type") + "/" + body.get("id"));
        bindVars.put("keepList", body.get("keepList"));
        return deviceRepository.getBasicInfo(bindVars);
    }

    public List<String> getUserDeviceList(Map<String, Object> body) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("id", body.get("type") + "/" + body.get("id"));
        return userRepository.getDeviceList(bindVars);
    }

    public List<String> getUserCardList(Map<String, Object> body) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("id", body.get("type") + "/" + body.get("id"));
        return userRepository.getCardList(bindVars);
    }

    public List<String> getMappingUserList(Map<String, Object> body) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("id", body.get("type") + "/" + body.get("id"));
        return mappingRepository.getUserList(bindVars);
    }

    public List<Map<String, Object>> getFrequency(Map<String, Object> body) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("id", body.get("type") + "/" + body.get("id"));
        bindVars.put("fromDate", body.get("fromDate"));
        bindVars.put("toDate", body.get("toDate"));
        bindVars.put("dateFormat", body.get("dateFormat"));
        return arangoDBRepository.getFrequency(bindVars);
    }

    public List<Map<String, Object>> getMerchantOverview(Map<String, Object> body) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("id", body.get("type") + "/" + body.get("id"));
        bindVars.put("fromDate", body.get("fromDate"));
        bindVars.put("toDate", body.get("toDate"));
        return arangoDBRepository.getMerchantOverview(bindVars);
    }

    public List<Map<String, Object>> getMerchantDetails(Map<String, Object> body) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("id", body.get("type") + "/" + body.get("id"));
        bindVars.put("fromDate", body.get("fromDate"));
        bindVars.put("toDate", body.get("toDate"));
        return arangoDBRepository.getMerchantDetails(bindVars);
    }

    public List<Map<String, Object>> getMonetary(Map<String, Object> body) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("id", body.get("type") + "/" + body.get("id"));
        bindVars.put("fromDate", body.get("fromDate"));
        bindVars.put("toDate", body.get("toDate"));
        return arangoDBRepository.getMonetary(bindVars);
    }

    public List<Map<String, Object>> getGeolocation(Map<String, Object> body) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("id", body.get("type") + "/" + body.get("id"));
        bindVars.put("fromDate", body.get("fromDate"));
        bindVars.put("toDate", body.get("toDate"));
        return arangoDBRepository.getGeolocation(bindVars);
    }

    public List<Map<String, Object>> getMappingBank(Map<String, Object> body) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("id", body.get("type") + "/" + body.get("id"));
        bindVars.put("fromDate", body.get("fromDate"));
        bindVars.put("toDate", body.get("toDate"));
        return arangoDBRepository.getMappingBank(bindVars);
    }

    public List<Map<String, Object>> getMappingTimeline(Map<String, Object> body) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("id", body.get("type") + "/" + body.get("id"));
        bindVars.put("fromDate", body.get("fromDate"));
        bindVars.put("toDate", body.get("toDate"));
        return arangoDBRepository.getMappingTimeline(bindVars);
    }

    public List<Map<String, Object>> getMappingOverview(Map<String, Object> body) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("id", body.get("type") + "/" + body.get("id"));
        bindVars.put("fromDate", body.get("fromDate"));
        bindVars.put("toDate", body.get("toDate"));
        return arangoDBRepository.getMappingOverview(bindVars);
    }

    public List<Map<String, Object>> getLastDeviceOnboardAndLastTransaction(Map<String, Object> body) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("id", body.get("type") + "/" + body.get("id"));
        return arangoDBRepository.getLastDeviceOnboardAndLastTransaction(bindVars);
    }

    public ArrayList<Object> getTest(CustomQuery customQuery) {
        return arangoDBCustom.getDataByDynamicQuery(customQuery);
    }
}
