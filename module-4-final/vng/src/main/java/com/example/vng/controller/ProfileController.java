package com.example.vng.controller;

import com.example.vng.model.CustomQuery;
import com.example.vng.service.ProfileService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ProfileController {
    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping("/profile/device")
    public List<Map<String, Object>> getDeviceInfo(@RequestBody Map<String, Object> body) {
        return profileService.getDeviceInfo(body);
    }

    @PostMapping("/profile/device/userList")
    public List<String> getDeviceUserList(@RequestBody Map<String, Object> body) {
        return profileService.getDeviceUserList(body);
    }

    @PostMapping("/profile/user/deviceList")
    public List<String> getUserDeviceList(@RequestBody Map<String, Object> body) {
        return profileService.getUserDeviceList(body);
    }

    @PostMapping("/profile/user/cardList")
    public List<String> getUserCardList(@RequestBody Map<String, Object> body) {
        return profileService.getUserCardList(body);
    }

    @PostMapping("/profile/card/userList")
    public List<String> getMappingUserList(@RequestBody Map<String, Object> body) {
        return profileService.getMappingUserList(body);
    }

    @PostMapping("/profile/device/basicInfo")
    public List<Map<String, Object>> getDeviceBasicInfo(@RequestBody Map<String, Object> body) {
        return profileService.getDeviceBasicInfo(body);
    }

    @PostMapping("/profile/frequency")
    public List<Map<String, Object>> getFrequency(@RequestBody Map<String, Object> body) {
        return profileService.getFrequency(body);
    }

    @PostMapping("/profile/merchant/overview")
    public List<Map<String, Object>> getMerchantOverview(@RequestBody Map<String, Object> body) {
        return profileService.getMerchantOverview(body);
    }

    @PostMapping("/profile/merchant/details")
    public List<Map<String, Object>> getMerchantDetails(@RequestBody Map<String, Object> body) {
        return profileService.getMerchantDetails(body);
    }

    @PostMapping("/profile/monetary")
    public List<Map<String, Object>> getMonetary(@RequestBody Map<String, Object> body) {
        return profileService.getMonetary(body);
    }

    @PostMapping("/profile/geolocation")
    public List<Map<String, Object>> getGeolocation(@RequestBody Map<String, Object> body) {
        return profileService.getGeolocation(body);
    }

    @PostMapping("/profile/mapping/bank")
    public List<Map<String, Object>> getMappingBank(@RequestBody Map<String, Object> body) {
        return profileService.getMappingBank(body);
    }

    @PostMapping("/profile/mapping/timestamp")
    public List<Map<String, Object>> getMappingTimeline(@RequestBody Map<String, Object> body) {
        return profileService.getMappingTimeline(body);
    }

    @PostMapping("/profile/mapping/overview")
    public List<Map<String, Object>> getMappingOverview(@RequestBody Map<String, Object> body) {
        return profileService.getMappingOverview(body);
    }

    @PostMapping("/profile/lastOnboardAndLastTransaction")
    public List<Map<String, Object>> getLastDeviceOnboardAndLastTransaction(@RequestBody Map<String, Object> body) {
        return profileService.getLastDeviceOnboardAndLastTransaction(body);
    }

    @PostMapping("/profile/test")
    public List<Object> getTest(@RequestBody CustomQuery customQuery) {
        return profileService.getTest(customQuery);
    }
}
