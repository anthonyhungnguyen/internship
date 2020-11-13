package com.example.vng.repository;

import com.arangodb.springframework.annotation.BindVars;
import com.arangodb.springframework.annotation.Query;
import com.arangodb.springframework.repository.ArangoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ArangoDBRepository extends ArangoRepository<String, String> {

    @Query("RETURN NOT(IS_NULL(DOCUMENT(@id)))")
    List<Boolean> checkTypeAndIDExists(@BindVars Map<String, Object> bindVars);

    @Query("FOR v, e IN 1..1 ANY @id user_device_onboard\n" +
            "FILTER TO_NUMBER(e.timestamp*1000) >= DATE_TIMESTAMP(@fromDate) AND TO_NUMBER(e.timestamp*1000) <= DATE_TIMESTAMP(@toDate)\n" +
            "COLLECT date = DATE_FORMAT(DATE_ISO8601(TO_NUMBER(e.timestamp) * 1000), @dateFormat) WITH COUNT INTO date_count\n" +
            "RETURN {date, date_count}")
    List<Map<String, Object>> getFrequency(@BindVars Map<String, Object> bindVars);

    @Query("LET idList = @idList\n" +
            "FOR id in idList\n" +
            "FOR v, e IN 1..1 ANY id GRAPH \"test\"\n" +
            "COLLECT source = e._from, target = e._to\n" +
            "RETURN {source, target}")
    List<Map<String, Object>> getOneMoreDepth(@BindVars Map<String, Object> bindVars);


    @Query("LET idList = @idList\n" +
            "FOR id in idList\n" +
            "FOR v, e IN 1..@depth ANY id GRAPH \"test\"\n" +
            "COLLECT source = e._from, target = e._to\n" +
            "RETURN {source, target}")
    List<Map<String, Object>> getDepth(@BindVars Map<String, Object> bindVars);
}
