package com.example.vng.repository;

import com.arangodb.springframework.annotation.Query;
import com.arangodb.springframework.repository.ArangoRepository;
import com.example.vng.model.UserDevice;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDeviceRepository extends ArangoRepository<UserDevice, String> {
    @Query("FOR d, ud in 1..1 INBOUND @id user_device RETURN ud.timestamp")
    List<String> findDeviceTimestamp(@Param("id") String id);
}
