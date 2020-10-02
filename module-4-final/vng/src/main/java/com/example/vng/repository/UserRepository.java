package com.example.vng.repository;

import com.arangodb.springframework.annotation.BindVars;
import com.arangodb.springframework.annotation.Query;
import com.arangodb.springframework.repository.ArangoRepository;

import java.util.List;
import java.util.Map;

public interface UserRepository extends ArangoRepository<String, String> {
    @Query("FOR v, e IN 1..1 ANY @id user_device_onboard\n" +
            "COLLECT device = e._to\n" +
            "RETURN device")
    List<String> getDeviceList(@BindVars Map<String, Object> bindVars);

    @Query("FOR v, e IN 1..1 ANY @id user_card_account\n" +
            "COLLECT card = e._to\n" +
            "RETURN card")
    List<String> getCardList(@BindVars Map<String, Object> bindVars);
}
