package com.example.vng.repository;

import com.arangodb.springframework.annotation.BindVars;
import com.arangodb.springframework.annotation.Query;
import com.arangodb.springframework.repository.ArangoRepository;

import java.util.List;
import java.util.Map;

public interface UserRepository extends ArangoRepository<String, String> {
    @Query("LET device_list = (FOR v, e IN 1..1 ANY @id user_device_onboard\n" +
            "    COLLECT deviceid = e._to\n" +
            "    return deviceid)\n" +
            "\n" +
            "FOR e IN device_list  \n" +
            "    LET timestamp = (FOR in_v, in_e IN 1..1 ANY @id user_device_onboard FILTER in_e._to == e SORT in_e.timestamp RETURN DATE_ISO8601(in_e.timestamp * 1000))\n" +
            "    RETURN {deviceid: e, firstseen: timestamp[0], lastseen: timestamp[-1]}")
    List<Map<String, Object>> getDeviceList(@BindVars Map<String, Object> bindVars);

    @Query("LET card_list = (FOR v, e IN 1..1 ANY @id user_card_account COLLECT card = e._to RETURN card)\n" +
            "FOR e IN card_list\n" +
            "    LET timestamp = (FOR in_v, in_e IN 1..1 ANY @id user_card_account FILTER in_e._to == e SORT in_e.reqDate RETURN DATE_ISO8601(in_e.reqDate))\n" +
            "    RETURN {cardid: e, firstseen: timestamp[0], lastseen: timestamp[-1]}")
    List<Map<String, Object>> getCardList(@BindVars Map<String, Object> bindVars);
}
