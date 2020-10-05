package com.example.vng.service;

import com.example.vng.model.CustomQuery;
import com.example.vng.repository.*;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

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

    public List<Map<String, Object>> getInfo(Map<String, Object> body) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("id", body.get("type") + "/" + body.get("id"));
        return arangoDBRepository.getInfo(bindVars);
    }

    public Map<String, Object> getDeviceHardwareScore(Map<String, Object> body) {
        Map<String, Object> bindVars = new HashMap<>();
        List<String> calcFields = Arrays.asList(
                "hw_board",
                "hw_cpu_name",
                "hw_screen_aspect_ratio",
                "hw_screen_class",
                "battery_type",
                "hw_screen_pixel_density",
                "hw_cpu_speed",
                "hw_screen_refresh_rate",
                "hw_cpu_supported_64_bit_abis",
                "hw_cpu_core_count",
                "hw_cpu_supported_32_bit_abis",
                "hw_cpu_processor",
                "hw_screen_size",
                "hw_cpu_supported_abis",
                "hw_ram_total",
                "hw_cpu_min_speed",
                "hw_storage_total",
                "os_version");
        bindVars.put("id", body.get("type") + "/" + body.get("id"));
        bindVars.put("fields", calcFields);

        List<String> list_weight_1 = Arrays.asList("hw_cpu_name",
                "hw_screen_aspect_ratio",
                "hw_screen_class",
                "battery_type",
                "hw_cpu_speed",
                "hw_cpu_core_count",
                "hw_cpu_supported_64_bit_abis",
                "hw_cpu_supported_32_bit_abis",
                "hw_cpu_processor",
                "hw_cpu_supported_abis");
        List<String> list_weight_2 = Arrays.asList("hw_board", "hw_screen_size", "hw_cpu_min_speed", "os_version");
        List<String> list_weight_3 = Arrays.asList("hw_screen_pixel_density",
                "hw_ram_total",
                "hw_storage_total",
                "hw_screen_refresh_rate");

        ArrayList<Map<String, Object>> scoreData = new ArrayList<>();
        List<Map<String, Object>> scoreList = deviceRepository.getHardwareScore(bindVars);
        scoreList.forEach((s) -> {
            String field = (String) s.get("field");
            Double percent = (Double) s.get("percent");
            String value = (String) s.get("value");
            double fieldScore = 0;
            if(!Arrays.asList("nan", "", "0.0", "0").contains(value)) {
                if(list_weight_1.contains(field)) {
                    fieldScore = 3 * (1 - percent);
                } else if (list_weight_2.contains(field)) {
                    fieldScore = 2 * (1 - percent);
                } else if (list_weight_3.contains(field)) {
                    fieldScore = 1 - percent;
                }
                Map<String, Object> scoreForField = new HashMap<>();
                scoreForField.put("field", field);
                scoreForField.put("score", fieldScore);
                scoreData.add(scoreForField);
            }
        });
        double totalScore = scoreData.stream().mapToDouble((x) -> (double) x.get("score")).sum();

        Map<String, Object> scores = new HashMap<>();
        scores.put("score", totalScore);
        scores.put("scoreData", scoreData);
        return scores;
    }

    public List<Map<String, Object>> getDeviceUserList(Map<String, Object> body) {
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

    public List<Map<String, Object>> getMappingBasicInfo(Map<String, Object> body) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("id", body.get("type") + "/" + body.get("id"));
        return mappingRepository.getBasicInfo(bindVars);
    }

    public List<Map<String, Object>> getUserDeviceList(Map<String, Object> body) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("id", body.get("type") + "/" + body.get("id"));
        return userRepository.getDeviceList(bindVars);
    }

    public List<Map<String, Object>> getUserCardList(Map<String, Object> body) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("id", body.get("type") + "/" + body.get("id"));
        return userRepository.getCardList(bindVars);
    }

    public List<Map<String, Object>> getMappingUserList(Map<String, Object> body) {
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

    public List<Map<String, Object>> getOneMoreDepth(Map<String, Object> body) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("idList", body.get("idList"));
        return arangoDBRepository.getOneMoreDepth(bindVars);
    }

    public ArrayList<Object> getTest(CustomQuery customQuery) {
        return arangoDBCustom.getDataByDynamicQuery(customQuery);
    }

    public List<Map<String, Object>> getGraph0(Map<String, Object> body) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("id", body.get("type") + "/" + body.get("id"));
        bindVars.put("depth", body.get("depth"));
        return arangoDBRepository.getGraph0(bindVars);
    }

    public List<Map<String, Object>> getGraph0MoreDepth(Map<String, Object> body) {
        Map<String, Object> bindVars = new HashMap<>();
        bindVars.put("idList", body.get("idList"));
        return arangoDBRepository.getGraph0MoreDepth(bindVars);
    }
}
