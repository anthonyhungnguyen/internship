package com.example.vng.controller;

import com.example.vng.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/investigation/user/")
public class UserController {
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("{id}/info")
    public Map<String, Object> getUserInfo(@PathVariable("id") String id) {
        List<String> list = Arrays.asList("profilelevel",
                "acquital_result",
                "postmortem_add_date",
                "postmortem_result",
                "avatar",
                "birthdate",
                "displayname",
                "isLocked",
                "kycdob",
                "kycfullname",
                "kycgender",
                "phonenumber",
                "usergender",
                "zaloid");
        return userRepository.getUserInfo("userid/" + id, list);
    }

    @PostMapping("{id}/monetary/timeline")
    public List<Map<String, Object>> getMonetary(@PathVariable("id") String id, @RequestBody Map<String, Object> body) {
        return userRepository.getMonetary("userid/" + id, body);
    }

    @PostMapping("{id}/monetary/overview")
    public List<Map<String, Object>> getMonetaryOverview(@PathVariable("id") String id, @RequestBody Map<String, Object> body) {
        return userRepository.getMonetaryStatus("userid/" + id, body);
    }

    @PostMapping("{id}/transaction")
    public List<Map<String, Object>> getTransaction(@PathVariable("id") String id, @RequestBody Map<String, Object> body) {
        return userRepository.getTransaction("userid/" + id, body);
    }

    @PostMapping("{id}/geolocation")
    public List<Map<String, Object>> getGeolocation(@PathVariable("id") String id, @RequestBody Map<String, Object> body) {
        return userRepository.getGeolocation("userid/" + id, body);
    }

    @PostMapping("{id}/merchant/overview")
    public List<Map<String, Object>> getMerchantOverview(@PathVariable("id") String id, @RequestBody Map<String, Object> body) {
        return userRepository.getMerchantOverview("userid/" + id, body);
    }

    @PostMapping("{id}/merchant/details")
    public List<Map<String, Object>> getMerchantDetails(@PathVariable("id") String id, @RequestBody Map<String, Object> body) {
        return userRepository.getMerchantDetails("userid/" + id, body);
    }

    @PostMapping("{id}/merchant/table")
    public List<Map<String, Object>> getMerchantOverviewTable(@PathVariable("id") String id, @RequestBody Map<String, Object> body) {
        return userRepository.getMerchantOverviewTable("userid/" + id, body);
    }

    @PostMapping("{id}/mapping/card/table")
    public List<Map<String, Object>> getMappingCardTable(@PathVariable("id") String id, @RequestBody Map<String, Object> body) {
        return userRepository.getMappingCardTable("userid/" + id, body);
    }

    @PostMapping("{id}/mapping/account/table")
    public List<Map<String, Object>> getMappingAccountTable(@PathVariable("id") String id, @RequestBody Map<String, Object> body) {
        return userRepository.getMappingAccountTable("userid/" + id, body);
    }

    @PostMapping("{id}/{mappingType}/mapping/overview")
    public List<Map<String, Object>> getCardMappingOverview(@PathVariable("id") String id, @PathVariable("mappingType") String type) {
        Map<String, String> body = new HashMap<>();
        if (type.equals("card")) {
            body.put("@col", "map_card");
        } else {
            body.put("@col", "map_account");
        }
        return userRepository.getMappingOverview("userid/" + id, body);
    }

    @PostMapping("{id}/{mappingType}/mapping/timeline")
    public List<Map<String, Object>> getCardMappingTimeline(@PathVariable("id") String id, @PathVariable("mappingType") String type) {
        Map<String, String> body = new HashMap<>();
        if (type.equals("card")) {
            body.put("@col", "map_card");
        } else {
            body.put("@col", "map_account");
        }
        return userRepository.getMappingTimeline("userid/" + id, body);
    }

    @PostMapping("{id}/{mappingType}/mapping/bank")
    public List<Map<String, Object>> getCardMappingBank(@PathVariable("id") String id, @PathVariable("mappingType") String type) {
        Map<String, String> body = new HashMap<>();
        if (type.equals("card")) {
            body.put("@col", "map_card");
        } else {
            body.put("@col", "map_account");
        }
        return userRepository.getMappingBank("userid/" + id, body);
    }


    @PostMapping("{id}/mapping/overview")
    public Map<String, Object> getMappingStatisticsOverview(@PathVariable("id") String id, @RequestBody Map<String, Object> body) {
        return userRepository.getMappingStatisticsOverview("userid/" + id, body);
    }

    @PostMapping("{id}/monetary/overview")
    public Map<String, Object> getSpendingStatisticsOverview(@PathVariable("id") String id, @RequestBody Map<String, Object> body) {
        return userRepository.getSpendingStatisticsOverview("userid/" + id, body);
    }

    @PostMapping("{id}/monetary/overview/frequency")
    public Map<String, Object> getSpendingFrequencyOverview(@PathVariable("id") String id, @RequestBody Map<String, Object> body) {
        return userRepository.getSpendingFrequencyOverview("userid/" + id, body);
    }

//    @PostMapping("network/card")
//    public List<Map<String, Object>> getNetworkCard(@RequestBody Map<String, Object> body) {
//        return userRepository.getNetworkCard(body);
//    }
//
//    @PostMapping("network/account")
//    public List<Map<String, Object>> getNetworkAccount(@RequestBody Map<String, Object> body) {
//        return userRepository.getNetworkAccount(body);
//    }
}
