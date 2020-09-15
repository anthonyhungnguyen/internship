package com.example.vng.repository;

import com.arangodb.springframework.annotation.Query;
import com.arangodb.springframework.repository.ArangoRepository;
import com.example.vng.model.UserDevice;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface UserDeviceRepository extends ArangoRepository<UserDevice, String> {
    @Query("FOR d, ud in 1..1 INBOUND @deviceId users_devices FILTER ud.type == @type RETURN ud.timestamp")
    List<String> findDeviceTimestamp(@Param("deviceId") String id, @Param("type") String type);

    @Query("FOR u, ud IN 1..1 INBOUND @deviceId users_devices FILTER ud.type == @type" +
            " FOR d, new_ud IN 1..1 OUTBOUND u._id users_devices FILTER new_ud.type == @type" +
            " RETURN DISTINCT {source: new_ud._from, target: new_ud._to}")
    List<Map<String, String>> findMultipleUsersDevicesDepth2(@Param("deviceId") String id, @Param("type") String type);

    @Query("FOR u, ud IN 1..1 OUTBOUND @userId users_devices FILTER ud.type == @type RETURN DISTINCT {source: ud._from, target: ud._to}")
    List<Map<String, String>> findDevicesRelatedToUsers(@Param("userId") String id, @Param("type") String type);

    @Query("FOR d, ud IN 1..1 INBOUND @deviceId users_devices FILTER ud.type == @type RETURN DISTINCT {source: ud._from, target: ud._to}")
    List<Map<String, String>> findUsersRelatedToDevices(@Param("deviceId") String id, @Param("type") String type);
}
