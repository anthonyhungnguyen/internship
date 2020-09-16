package com.example.vng.repository;

import com.arangodb.springframework.annotation.Query;
import com.arangodb.springframework.repository.ArangoRepository;
import com.example.vng.model.DeviceSpending;
import com.example.vng.model.Merchant;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface TPERepository extends ArangoRepository<Merchant,
        String> {
    @Query("FOR t, udt IN 1..1 INBOUND @deviceId users_devices " +
            "FILTER udt.type == @type COLLECT merchant = udt.merchant " +
            "AGGREGATE merchant_count = COUNT(udt.merchant) " +
            "RETURN {merchant, merchant_count}")
    List<Merchant> getMerchantCountByDeviceId(@Param("deviceId") String id, @Param(
            "type") String type);

    @Query("FOR u, ud IN 1..1 INBOUND @deviceId users_devices " +
            "FILTER ud.type == @type AND ud.merchant != @transType " +
            "COLLECT date = DATE_FORMAT(DATE_TIMESTAMP(ud.reqDate), " +
            "@dateFormat) AGGREGATE amount = SUM(TO_NUMBER(ud.amount))" +
            "RETURN {date, amount}")
    List<DeviceSpending> getSpendingFrequencyByDeviceId(@Param("deviceId") String id,
            @Param("type") String type,
            @Param("transType") String transType,
            @Param("dateFormat") String dateFormat);

    @Query("FOR u, ud IN 1..1 INBOUND " +
            "@deviceId users_devices " +
            "FILTER ud.type == @type and ud.latitude != @cond " +
            " and ud.longitude != @cond" +
            "    return {lat: ud.latitude, lng: ud.longitude}")
    List<Map<String, String>> getGeolocationActivity(@Param("deviceId") String id, @Param("type") String type, @Param("cond") String cond);
}
