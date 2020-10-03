package com.example.vng.repository;

import com.arangodb.springframework.annotation.BindVars;
import com.arangodb.springframework.annotation.Query;
import com.arangodb.springframework.repository.ArangoRepository;

import java.util.List;
import java.util.Map;

public interface MappingRepository extends ArangoRepository<String, String> {

    @Query("FOR v, e IN 1..1 ANY @id user_card_account\n" +
            "COLLECT users = e._from\n" +
            "RETURN users")
    List<String> getUserList(@BindVars Map<String, Object> bindVars);

    @Query("RETURN FIRST(FOR v, e IN 1..1 ANY @id user_card_account\n" +
            "SORT e.reqDate DESC\n" +
            "RETURN KEEP(e, ['bankname', 'bankCode', 'reqDate']))")
    List<Map<String, Object>> getBasicInfo(@BindVars Map<String, Object> bindVars);
}
