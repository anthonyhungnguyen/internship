package com.example.vng.controller;

import com.example.vng.repository.ArangoDBRepository;
import com.example.vng.repository.DeviceRepository;
import com.example.vng.repository.MappingRepository;
import com.example.vng.repository.UserRepository;
import com.example.vng.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ProfileController {
    private final DeviceService deviceService;
    private final ArangoDBRepository arangoDBRepository;
    private final DeviceRepository deviceRepository;
    private final UserRepository userRepository;
    private final MappingRepository mappingRepository;

    @Autowired
    public ProfileController(DeviceService deviceService, ArangoDBRepository arangoDBRepository, DeviceRepository deviceRepository, UserRepository userRepository, MappingRepository mappingRepository) {
        this.deviceService = deviceService;
        this.arangoDBRepository = arangoDBRepository;
        this.deviceRepository = deviceRepository;
        this.userRepository = userRepository;
        this.mappingRepository = mappingRepository;
    }


    @PostMapping("profile/exists")
    public boolean checkTypeAndIDExists(@RequestBody Map<String, Object> body) {
        body.put("id", body.get("type") + "/" + body.get("id"));
        body.remove("type");
        return arangoDBRepository.checkTypeAndIDExists(body).get(0);
    }

    @PostMapping("/profile/info")
    public List<Map<String, Object>> getDeviceInfo(@RequestBody Map<String, Object> body) {
        body.put("id", body.get("type") + "/" + body.get("id"));
        body.remove("type");
        return arangoDBRepository.getInfo(body);
    }

    @PostMapping("/profile/ip")
    public List<String> getIPList(@RequestBody Map<String, Object> body) {
        body.put("id", body.get("type") + "/" + body.get("id"));
        body.remove("type");
        return arangoDBRepository.getIPList(body);
    }

    @PostMapping("/profile/device/score/hardware")
    public Map<String, Object> getDeviceHardwareScore(@RequestBody Map<String, Object> body) {
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
        body.put("id", body.get("type") + "/" + body.get("id"));
        body.put("fields", calcFields);
        body.remove("type");
        List<Map<String, Object>> scoreList = deviceRepository.getHardwareScore(body);
        return deviceService.getDeviceHardwareScore(scoreList);
    }

    @PostMapping("/profile/mapping/basicInfo")
    public List<Map<String, Object>> getMappingBasicInfo(@RequestBody Map<String, Object> body) {
        body.put("id", body.get("type") + "/" + body.get("id"));
        body.remove("type");
        return mappingRepository.getBasicInfo(body);
    }

    @PostMapping("/profile/device/userList")
    public List<Map<String, Object>> getDeviceUserList(@RequestBody Map<String, Object> body) {
        body.put("id", body.get("type") + "/" + body.get("id"));
        body.remove("type");
        return deviceRepository.getUserList(body);
    }

    @PostMapping("/profile/user/deviceList")
    public List<Map<String, Object>> getUserDeviceList(@RequestBody Map<String, Object> body) {
        body.put("id", body.get("type") + "/" + body.get("id"));
        body.remove("type");
        return userRepository.getDeviceList(body);
    }

    @PostMapping("/profile/user/cardList")
    public List<Map<String, Object>> getUserCardList(@RequestBody Map<String, Object> body) {
        body.put("id", body.get("type") + "/" + body.get("id"));
        body.remove("type");
        return userRepository.getCardList(body);
    }

    @PostMapping("/profile/card/userList")
    public List<Map<String, Object>> getMappingUserList(@RequestBody Map<String, Object> body) {
        body.put("id", body.get("type") + "/" + body.get("id"));
        body.remove("type");
        return mappingRepository.getUserList(body);
    }

    @PostMapping("/profile/device/basicInfo")
    public List<Map<String, Object>> getDeviceBasicInfo(@RequestBody Map<String, Object> body) {
        body.put("id", body.get("type") + "/" + body.get("id"));
        body.remove("type");
        return deviceRepository.getBasicInfo(body);
    }

    @PostMapping("/profile/frequency")
    public List<Map<String, Object>> getFrequency(@RequestBody Map<String, Object> body) {
        body.put("id", body.get("type") + "/" + body.get("id"));
        body.remove("type");
        return arangoDBRepository.getFrequency(body);
    }

    @PostMapping("/profile/merchant/overview")
    public List<Map<String, Object>> getMerchantOverview(@RequestBody Map<String, Object> body) {
        body.put("id", body.get("type") + "/" + body.get("id"));
        body.remove("type");
        return arangoDBRepository.getMerchantOverview(body);
    }

    @PostMapping("/profile/merchant/details")
    public List<Map<String, Object>> getMerchantDetails(@RequestBody Map<String, Object> body) {
        body.put("id", body.get("type") + "/" + body.get("id"));
        body.remove("type");
        return arangoDBRepository.getMerchantDetails(body);
    }

    @PostMapping("/profile/monetary")
    public List<Map<String, Object>> getMonetary(@RequestBody Map<String, Object> body) {
        body.put("id", body.get("type") + "/" + body.get("id"));
        body.remove("type");
        return arangoDBRepository.getMonetary(body);
    }

    @PostMapping("/profile/geolocation")
    public List<Map<String, Object>> getGeolocation(@RequestBody Map<String, Object> body) {
        body.put("id", body.get("type") + "/" + body.get("id"));
        body.remove("type");
        return arangoDBRepository.getGeolocation(body);
    }

    @PostMapping("profile/depth")
    public List<Map<String, Object>> getOneMoreDepth(@RequestBody Map<String, Object> body) {
        return arangoDBRepository.getOneMoreDepth(body);
    }


    @PostMapping("profile/graph0")
    public List<Map<String, Object>> getGraph0(@RequestBody Map<String, Object> body) {
        body.put("id", body.get("type") + "/" + body.get("id"));
        body.remove("type");
        return arangoDBRepository.getGraph0(body);
    }

    @PostMapping("profile/graph0/moreDepth")
    public List<Map<String, Object>> getGraph0MoreDepth(@RequestBody Map<String, Object> body) {
        return arangoDBRepository.getGraph0MoreDepth(body);
    }

}
