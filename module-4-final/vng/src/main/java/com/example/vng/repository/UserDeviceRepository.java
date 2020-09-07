package com.example.vng.repository;

import com.arangodb.springframework.repository.ArangoRepository;
import com.example.vng.model.UserDevice;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDeviceRepository extends ArangoRepository<UserDevice, String> {
    int countAllByDevice_Id(String id);
}
