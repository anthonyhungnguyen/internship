package com.example.vng.service;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DeviceService {
    public Map<String, Object> getDeviceHardwareScore(List<Map<String, Object>> scoreList) {
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
        scoreList.forEach((s) -> {
            String field = (String) s.get("field");
            Double percent = (Double) s.get("percent");
            String value = (String) s.get("value");
            double fieldScore = 0;
            if (!Arrays.asList("nan", "", "0.0", "0").contains(value)) {
                if (list_weight_1.contains(field)) {
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
}
