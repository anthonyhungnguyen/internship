package com.example.vng.repository;

import com.arangodb.springframework.annotation.BindVars;
import com.arangodb.springframework.annotation.Query;
import com.arangodb.springframework.repository.ArangoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface TPERepository extends ArangoRepository<Map<String, Object>,
        String> {
    @Query("FOR t, udt IN 1..1 INBOUND @deviceId users_devices " +
            "FILTER udt.type == @type " +
            "COLLECT merchant = udt.merchant " +
            "AGGREGATE merchant_count = COUNT(udt.merchant) " +
            "SORT merchant_count DESC " +
            "RETURN {merchant, merchant_count}")
    List<Map<String, Object>> getMerchantCountByDeviceId(@BindVars Map<String, Object> bindVars);

    @Query("FOR u, ud IN 1..1 INBOUND @deviceId users_devices " +
            "FILTER ud.type == @type AND ud.merchant != @transType " +
            "COLLECT date = DATE_FORMAT(DATE_TIMESTAMP(ud.reqDate), " +
            "@dateFormat) AGGREGATE amount = SUM(TO_NUMBER(ud.amount))" +
            "RETURN {date, amount}")
    List<Map<String, Object>> getSpendingFrequencyByDeviceId(@BindVars Map<String, Object> bindVars);

    @Query("FOR u, ud IN 1..1 INBOUND " +
            "@deviceId users_devices " +
            "FILTER ud.type == @type AND ud.latitude != @cond " +
            " AND ud.longitude != @cond" +
            " COLLECT lat = ud.latitude," +
            "           lng = ud.longitude" +
            " AGGREGATE countLocation = count(ud.lat)" +
            "    RETURN {lat, lng, countLocation}")
    List<Map<String, Object>> getGeolocationActivity(@BindVars Map<String, Object> bindVars);
}
