package com.example.vng.repository;

import com.arangodb.springframework.repository.ArangoRepository;
import com.example.vng.model.Device;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceRepository extends ArangoRepository<Device, String> {

}
