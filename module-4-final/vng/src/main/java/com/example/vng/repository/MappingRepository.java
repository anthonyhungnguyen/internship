package com.example.vng.repository;

import com.arangodb.springframework.annotation.BindVars;
import com.arangodb.springframework.annotation.Query;
import com.arangodb.springframework.repository.ArangoRepository;

import java.util.List;
import java.util.Map;

public interface MappingRepository extends ArangoRepository<String, String> {

    @Query("LET user_list = (FOR v, e IN 1..1 ANY @id user_card_account\n" +
            "    COLLECT userid = e._from\n" +
            "    return userid)\n" +
            "\n" +
            "FOR e IN user_list  \n" +
            "    LET timestamp = (FOR in_v, in_e IN 1..1 ANY @id user_card_account FILTER in_e._from == e SORT in_e.reqDate RETURN DATE_ISO8601(in_e.reqDate))\n" +
            "    RETURN {userid: e, firstseen: timestamp[0], lastseen: timestamp[-1]}")
    List<Map<String, Object>> getUserList(@BindVars Map<String, Object> bindVars);

    @Query("RETURN FIRST(FOR v, e IN 1..1 ANY @id user_card_account\n" +
            "SORT e.reqDate DESC\n" +
            "RETURN KEEP(e, ['bankname', 'bankCode', 'reqDate']))")
    List<Map<String, Object>> getBasicInfo(@BindVars Map<String, Object> bindVars);
}
