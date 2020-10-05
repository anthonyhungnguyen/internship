package com.example.vng.repository;

import com.arangodb.springframework.annotation.BindVars;
import com.arangodb.springframework.annotation.Query;
import com.arangodb.springframework.repository.ArangoRepository;

import java.util.List;
import java.util.Map;

public interface DeviceRepository extends ArangoRepository<String, String> {

    @Query("LET user_list = (FOR v, e IN 1..1 ANY @id user_device_onboard\n" +
            "    COLLECT userid = e._from\n" +
            "    return userid)\n" +
            "\n" +
            "FOR e IN user_list  \n" +
            "    LET timestamp = (FOR in_v, in_e IN 1..1 ANY @id user_device_onboard FILTER in_e._from == e SORT in_e.timestamp RETURN DATE_ISO8601(in_e.timestamp * 1000))\n" +
            "    RETURN {userid: e, firstseen: timestamp[0], lastseen: timestamp[-1]}")
    List<Map<String, Object>> getUserList(@BindVars Map<String, Object> bindVars);

    @Query("RETURN KEEP(DOCUMENT(@id), @keepList)")
    List<Map<String, Object>> getBasicInfo(@BindVars Map<String, Object> bindVars);

    @Query("LET fields = @fields\n" +
            "\n" +
            "LET model = (FOR v, e IN 1..1 ANY @id device_devicemodel RETURN e._to)[0]\n" +
            "\n" +
            "LET devices_included = (FOR v, e IN 1..1 INBOUND model device_devicemodel RETURN DOCUMENT(e._from))\n" +
            "\n" +
            "LET total_devices = COUNT(devices_included)\n" +
            "\n" +
            "LET id_doc = DOCUMENT(@id)\n" +
            "\n" +
            "FOR lf in fields\n" +
            "LET field_count = COUNT(FOR v IN devices_included FILTER v[lf] == id_doc[lf] RETURN v)\n" +
            "RETURN {field: lf, value: id_doc[lf], percent: field_count/total_devices}")
    List<Map<String, Object>> getHardwareScore(@BindVars Map<String, Object> bindVars);
}
