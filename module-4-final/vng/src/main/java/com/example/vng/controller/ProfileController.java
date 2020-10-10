package com.example.vng.controller;

import com.example.vng.model.CustomQuery;
import com.example.vng.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ProfileController {
    private final ProfileService profileService;

    @Autowired
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }


    @PostMapping("profile/exists")
    public boolean checkTypeAndIDExists(@RequestBody Map<String, Object> body) {
        return profileService.checkTypeAndIDExists(body);
    }

    @PostMapping("/profile/info")
    public List<Map<String, Object>> getDeviceInfo(@RequestBody Map<String, Object> body) {
        return profileService.getInfo(body);
    }

    @PostMapping("/profile/ip")
    public List<String> getIPList(@RequestBody Map<String, Object> body) {
        return profileService.getIPList(body);
    }

    @PostMapping("/profile/device/score/hardware")
    public Map<String, Object> getDeviceHardwareScore(@RequestBody Map<String, Object> body) {
        return profileService.getDeviceHardwareScore(body);
    }

    @PostMapping("/profile/mapping/basicInfo")
    public List<Map<String, Object>> getMappingBasicInfo(@RequestBody Map<String, Object> body) {
        return profileService.getMappingBasicInfo(body);
    }

    @PostMapping("/profile/device/userList")
    public List<Map<String, Object>> getDeviceUserList(@RequestBody Map<String, Object> body) {
        return profileService.getDeviceUserList(body);
    }

    @PostMapping("/profile/user/deviceList")
    public List<Map<String, Object>> getUserDeviceList(@RequestBody Map<String, Object> body) {
        return profileService.getUserDeviceList(body);
    }

    @PostMapping("/profile/user/cardList")
    public List<Map<String, Object>> getUserCardList(@RequestBody Map<String, Object> body) {
        return profileService.getUserCardList(body);
    }

    @PostMapping("/profile/card/userList")
    public List<Map<String, Object>> getMappingUserList(@RequestBody Map<String, Object> body) {
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

    @PostMapping("/profile/lastOnboardAndLastTransaction")
    public List<Map<String, Object>> getLastDeviceOnboardAndLastTransaction(@RequestBody Map<String, Object> body) {
        return profileService.getLastDeviceOnboardAndLastTransaction(body);
    }

    @PostMapping("profile/depth")
    public List<Map<String, Object>> getOneMoreDepth(@RequestBody Map<String, Object> body) {
        return profileService.getOneMoreDepth(body);
    }


    @PostMapping("profile/graph0")
    public List<Map<String, Object>> getGraph0(@RequestBody Map<String, Object> body) {
        return profileService.getGraph0(body);
    }

    @PostMapping("profile/graph0/moreDepth")
    public List<Map<String, Object>> getGraph0MoreDepth(@RequestBody Map<String, Object> body) {
        return profileService.getGraph0MoreDepth(body);
    }

}
