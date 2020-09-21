package com.example.vng.repository;

import com.arangodb.springframework.annotation.BindVars;
import com.arangodb.springframework.annotation.Query;
import com.arangodb.springframework.repository.ArangoRepository;
import com.example.vng.model.UserDevice;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface UserDeviceRepository extends ArangoRepository<UserDevice, String> {
    @Query("FOR d, ud IN 1..1 INBOUND @deviceId users_devices " +
            "FILTER ud.type == @type " +
            "COLLECT date = DATE_FORMAT(DATE_ADD(DATE_ISO8601(TO_NUMBER(ud.timestamp) * 1000), 7, @date_add_type), @date_format) " +
            "AGGREGATE count = COUNT(ud.type) " +
            "RETURN {date, count}")
    List<Map<String, Object>> findDeviceTimestamp(@BindVars Map<String, Object> bindVars);

    @Query("FOR u, ud IN 1..@depth ANY @deviceId users_devices " +
            "FILTER ud.type == @type " +
            "COLLECT source = ud._from, target = ud._to " +
            "RETURN {source, target}")
    List<Map<String, String>> findMultipleUsersDevicesDepth(@BindVars Map<String, Object> bindVars);

    @Query("FOR u, ud IN 1..1 OUTBOUND @userId users_devices " +
            "FILTER ud.type == @type " +
            "RETURN DISTINCT {source: ud._from, target: ud._to}")
    List<Map<String, String>> findDevicesRelatedToUsers(@BindVars Map<String, Object> bindVars);

    @Query("FOR d, ud IN 1..1 INBOUND @deviceId users_devices " +
            "FILTER ud.type == @type " +
            "RETURN DISTINCT {source: ud._from, target: ud._to}")
    List<Map<String, String>> findUsersRelatedToDevices(@BindVars Map<String, Object> bindVars);

    @Query("LET deviceList = @deviceList " +
            "FOR device in deviceList " +
            "   FOR d, ud in 1..1 ANY device users_devices " +
            "       FILTER ud.type == @type " +
            "       COLLECT source = ud._from, target = ud._to " +
            "       RETURN {source, target}")
    List<Map<String, String>> findNextDepth(@BindVars Map<String, Object> bindVars);

}
