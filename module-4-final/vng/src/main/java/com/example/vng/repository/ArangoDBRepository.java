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

    @Query("RETURN DOCUMENT(@id)")
    List<Map<String, Object>> getInfo(@BindVars Map<String, Object> bindVars);

    @Query("FOR v, e IN 1..1 ANY @id user_device_transaction " +
            "   COLLECT ip = e.userIP" +
            "   RETURN ip")
    List<String> getIPList(@BindVars Map<String, Object> bindVars);

    @Query("FOR v, e IN 1..1 ANY @id user_device_onboard\n" +
            "FILTER TO_NUMBER(e.timestamp*1000) >= DATE_TIMESTAMP(@fromDate) AND TO_NUMBER(e.timestamp*1000) <= DATE_TIMESTAMP(@toDate)\n" +
            "COLLECT date = DATE_FORMAT(DATE_ISO8601(TO_NUMBER(e.timestamp) * 1000), @dateFormat) WITH COUNT INTO date_count\n" +
            "RETURN {date, date_count}")
    List<Map<String, Object>> getFrequency(@BindVars Map<String, Object> bindVars);

    @Query("FOR v, e IN 1..1 ANY @id user_device_transaction\n" +
            "FILTER DATE_TIMESTAMP(e.reqDate) >= DATE_TIMESTAMP(@fromDate) AND DATE_TIMESTAMP(e.reqDate) <= DATE_TIMESTAMP(@toDate)\n" +
            "COLLECT merchant = e.merchant\n" +
            "AGGREGATE merchant_count = COUNT(e.merchant), merchant_total = SUM(TO_NUMBER(e.amount))\n" +
            "SORT merchant_count DESC\n" +
            "RETURN {merchant, merchant_count, merchant_total}")
    List<Map<String, Object>> getMerchantOverview(@BindVars Map<String, Object> bindVars);


    @Query("FOR v, e IN 1..1 ANY @id user_device_transaction\n" +
            "FILTER DATE_TIMESTAMP(e.reqDate) >= DATE_TIMESTAMP(@fromDate) AND DATE_TIMESTAMP(e.reqDate) <= DATE_TIMESTAMP(@toDate)\n" +
            "COLLECT app_id = e.appid \n" +
            "AGGREGATE app_total = SUM(TO_NUMBER(e.amount)), app_id_count = COUNT(e.appid)\n" +
            "SORT app_id_count, app_total\n" +
            "RETURN {app_id, app_id_count, app_total}")
    List<Map<String, Object>> getMerchantDetails(@BindVars Map<String, Object> bindVars);

    @Query("FOR v, e IN 1..1 ANY @id user_device_transaction\n" +
            "FILTER e.merchant != 'Money Transfer' AND DATE_TIMESTAMP(e.reqDate) >= DATE_TIMESTAMP(@fromDate) AND DATE_TIMESTAMP(e.reqDate) <= DATE_TIMESTAMP(@toDate)\n" +
            "COLLECT date = DATE_FORMAT(DATE_TIMESTAMP(e.reqDate), '%dd-%mm-%yyyy')\n" +
            "AGGREGATE amount = SUM(TO_NUMBER(e.amount)), frequency = count(e.reqDate)\n" +
            "RETURN {date, amount, frequency}")
    List<Map<String, Object>> getMonetary(@BindVars Map<String, Object> bindVars);

    @Query("FOR v, e IN 1..1 ANY @id user_device_transaction\n" +
            "FILTER e.latitude != '0.0' AND e.longitude != '0.0'\n" +
            "AND DATE_TIMESTAMP(e.reqDate) >= DATE_TIMESTAMP(@fromDate) AND DATE_TIMESTAMP(e.reqDate) <= DATE_TIMESTAMP(@toDate)\n" +
            "COLLECT lat = TO_NUMBER(e.latitude),\n" +
            "lng = TO_NUMBER(e.longitude) WITH COUNT INTO location_count\n" +
            "RETURN {lat, lng, location_count}")
    List<Map<String, Object>> getGeolocation(@BindVars Map<String, Object> bindVars);

    @Query("FOR v,e IN 1..1 ANY @id user_card_account\n" +
            "FILTER TO_NUMBER(e.reqDate) >= DATE_TIMESTAMP(@fromDate) AND TO_NUMBER(e.reqDate) <= DATE_TIMESTAMP(@toDate)\n" +
            "COLLECT bName = e.bankname, status = e.requestStatus WITH count INTO status_count \n" +
            "RETURN {bName, status, status_count}")
    List<Map<String, Object>> getMappingBank(@BindVars Map<String, Object> bindVars);

    @Query("FOR v, e IN 1..1 ANY @id user_card_account\n" +
            "FILTER TO_NUMBER(e.reqDate) >= DATE_TIMESTAMP(@fromDate) AND TO_NUMBER(e.reqDate) <= DATE_TIMESTAMP(@toDate)\n" +
            "COLLECT date = DATE_FORMAT(DATE_ISO8601(e.reqDate), \"%yyyy-%mm-%dd\"), status = e.requestStatus WITH COUNT INTO status_count\n" +
            "SORT DATE_TIMESTAMP(date)\n" +
            "RETURN {date, status, status_count}")
    List<Map<String, Object>> getMappingTimeline(@BindVars Map<String, Object> bindVars);

    @Query("FOR v, e IN 1..1 ANY @id user_card_account\n" +
            "FILTER TO_NUMBER(e.reqDate) >= DATE_TIMESTAMP(@fromDate) AND TO_NUMBER(e.reqDate) <= DATE_TIMESTAMP(@toDate)\n" +
            "COLLECT status = e.requestStatus WITH COUNT INTO status_count\n" +
            "SORT status_count DESC\n" +
            "RETURN {status, status_count}")
    List<Map<String, Object>> getMappingOverview(@BindVars Map<String, Object> bindVars);

    @Query("LET last_device_onboard = FIRST((FOR v, e IN 1..1 ANY @id user_device_onboard\n" +
            "SORT e.timestamp DESC\n" +
            "LET date = DATE_ISO8601(TO_NUMBER(e.timestamp * 1000))\n" +
            "RETURN date))\n" +
            "\n" +
            "LET last_device_transaction = FIRST((FOR v, e IN 1..1 ANY @id user_device_transaction\n" +
            "SORT DATE_ISO8601(e.reqDate) DESC\n" +
            "LET date = DATE_ISO8601(e.reqDate)\n" +
            "RETURN date))\n" +
            "\n" +
            "RETURN {last_device_onboard, last_device_transaction}")
    List<Map<String, Object>> getLastDeviceOnboardAndLastTransaction(@BindVars Map<String, Object> bindVars);

    @Query("LET idList = @idList\n" +
            "FOR id in idList\n" +
            "FOR v, e IN 1..1 ANY id GRAPH \"test\"\n" +
            "COLLECT source = e._from, target = e._to\n" +
            "RETURN {source, target}")
    List<Map<String, Object>> getOneMoreDepth(@BindVars Map<String, Object> bindVars);

    @Query("LET idList = @idList\n" +
            "FOR id in idList\n" +
            "FOR v, e IN 1..1 ANY id GRAPH \"graph0\"\n" +
            "COLLECT source = e._from, target = e._to\n" +
            "RETURN {source, target}")
    List<Map<String, Object>> getGraph0MoreDepth(@BindVars Map<String, Object> bindVars);

    @Query("FOR v, e IN 1..@depth ANY @id GRAPH \"graph0\"\n" +
            "    RETURN e")
    List<Map<String, Object>> getGraph0(@BindVars Map<String, Object> bindVars);
}
