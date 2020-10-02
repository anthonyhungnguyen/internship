package com.example.vng.repository;

import com.arangodb.springframework.annotation.BindVars;
import com.arangodb.springframework.annotation.Query;
import com.arangodb.springframework.repository.ArangoRepository;

import java.util.List;
import java.util.Map;

public interface DeviceRepository extends ArangoRepository<String, String> {

    @Query("FOR v, e IN 1..1 ANY @id user_device_onboard\n" +
            "COLLECT user = e._from\n" +
            "RETURN user")
    List<String> getUserList(@BindVars Map<String, Object> bindVars);

    @Query("RETURN KEEP(DOCUMENT(@id), @keepList)")
    List<Map<String, Object>> getBasicInfo(@BindVars Map<String, Object> bindVars);
}
