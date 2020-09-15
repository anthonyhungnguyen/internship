package com.example.vng.repository;

import com.arangodb.springframework.annotation.Query;
import com.arangodb.springframework.repository.ArangoRepository;
import com.example.vng.model.Merchant;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TPERepository extends ArangoRepository<Merchant, String> {
    @Query("FOR t, udt IN 1..1 INBOUND @deviceId users_devices FILTER udt.type == @type COLLECT merchant = udt.merchant AGGREGATE merchant_count = COUNT(udt.merchant) RETURN {merchant, merchant_count}")
    List<Merchant> getMerchantCountByDeviceId(@Param("deviceId") String id, @Param("type") String type);
}
