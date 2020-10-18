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

    @Query("FOR v IN device_map_card\n" +
            "    FILTER v._to == @id\n" +
            "    COLLECT cardId = v.cardId, bankName = v.bankName, first6CardNo = v.first6CardNo, last4CardNo = v.last4CardNo\n" +
            "    RETURN {cardId, bankName, first6CardNo, last4CardNo}")
    List<Map<String, Object>> getCardOverview(@BindVars Map<String, Object> bindVars);

    @Query("FOR v IN device_map_account\n" +
            "    FILTER v._to == @id\n" +
            "    COLLECT cardId = v.accountId, bankName = v.bankName, firstAccountNo = v.firstAccountNo, lastAccountNo = v.lastAccountNo\n" +
            "    RETURN {cardId, bankName, firstAccountNo, lastAccountNo}")
    List<Map<String, Object>> getAccountOverview(@BindVars Map<String, Object> bindVars);

    @Query("FOR e IN @@col\n" +
            "    FILTER e._to == @id" +
            "    AND e.reqDate >= DATE_TIMESTAMP(@fromDate) AND e.reqDate <= DATE_TIMESTAMP(@toDate)\n" +
            "    COLLECT status = e.requestStatus WITH COUNT INTO status_count\n" +
            "    SORT status_count DESC\n" +
            "    RETURN {status, status_count}")
    List<Map<String, Object>> getMappingOverview(@BindVars Map<String, Object> bindVars);

    @Query("FOR e IN @@col\n" +
            "    FILTER e._to == @id\n" +
            "    AND e.reqDate >= DATE_TIMESTAMP(@fromDate) AND e.reqDate <= DATE_TIMESTAMP(@toDate)\n" +
            "    COLLECT date = DATE_FORMAT(DATE_ISO8601(e.reqDate), \"%yyyy-%mm-%dd\"), status = e.requestStatus WITH COUNT INTO status_count\n" +
            "    SORT DATE_TIMESTAMP(date)\n" +
            "    RETURN {date, status, status_count}")
    List<Map<String, Object>> getMappingTimeline(@BindVars Map<String, Object> bindVars);

    @Query("FOR e IN @@col\n" +
            "    FILTER e._to == @id AND e.reqDate >= DATE_TIMESTAMP(@fromDate) AND e.reqDate <= DATE_TIMESTAMP(@toDate)\n" +
            "    COLLECT bName = e.bankName, status = e.requestStatus WITH COUNT INTO status_count\n" +
            "    RETURN {bName, status, status_count}")
    List<Map<String, Object>> getMappingBank(@BindVars Map<String, Object> bindVars);


    @Query("    LET a = (FOR e IN device_map_card FILTER e._to == @id AND e.reqDate >= DATE_TIMESTAMP(@fromDate) AND e.reqDate <= DATE_TIMESTAMP(@toDate) RETURN e)\n" +
            "    LET b = (FOR e IN device_map_account FILTER e._to == @id AND e.reqDate >= DATE_TIMESTAMP(@fromDate) AND e.reqDate <= DATE_TIMESTAMP(@toDate) RETURN e)\n" +
            "    LET totalMapping = UNION(a, b)\n" +
            "    \n" +
            "    LET popularBank = FIRST((FOR e IN totalMapping\n" +
            "        COLLECT bankName = e.bankName WITH COUNT INTO bankNameCount\n" +
            "        SORT bankNameCount DESC\n" +
            "        LIMIT 1\n" +
            "        RETURN bankName))\n" +
            "    LET successPercent = FIRST((FOR e IN totalMapping\n" +
            "        COLLECT status = e.isSuccessful WITH COUNT INTO statusCount\n" +
            "        FILTER status == true\n" +
            "        RETURN statusCount / COUNT(totalMapping) * 100\n" +
            "    ))\n" +
            "    \n" +
            "    RETURN {card: count(a), account: count(b), popularBank, totalMappingTimes: COUNT(totalMapping), successPercent}")
    Map<String, Object> getMappingStatisticsOverview(@BindVars Map<String, Object> bindVars);

    @Query("LET totalPayment = (FOR e IN user_device_transaction FILTER e._to == @id AND DATE_TIMESTAMP(e.reqDate) >= DATE_TIMESTAMP(@fromDate) AND DATE_TIMESTAMP(e.reqDate) <= DATE_TIMESTAMP(@toDate) RETURN e)\n" +
            "LET popularMerchant = FIRST((FOR e IN totalPayment\n" +
            "        COLLECT merchant = e.merchant WITH COUNT INTO merchantCount\n" +
            "        SORT merchantCount DESC\n" +
            "        LIMIT 1\n" +
            "        RETURN merchant))\n" +
            "\n" +
            "LET graphData = (FOR e IN totalPayment\n" +
            "                    COLLECT date = DATE_FORMAT(DATE_TIMESTAMP(e.reqDate), '%dd-%mm-%yyyy')\n" +
            "                    AGGREGATE amount = SUM(TO_NUMBER(e.amount))\n" +
            "                    RETURN {date, amount})\n" +
            "    \n" +
            "LET totalAmount = SUM((FOR e IN totalPayment RETURN TO_NUMBER(e.amount)))\n" +
            "    \n" +
            "RETURN {popularMerchant, totalAmount, graphData}")
    Map<String, Object> getSpendingStatisticsOverview(@BindVars Map<String, Object> bindVars);

    @Query("LET totalPayment = (FOR e IN user_device_transaction FILTER e._to == @id AND DATE_TIMESTAMP(e.reqDate) >= DATE_TIMESTAMP(@fromDate) AND DATE_TIMESTAMP(e.reqDate) <= DATE_TIMESTAMP(@toDate) RETURN e)\n" +
            "\n" +
            "LET graphData = (FOR e in totalPayment\n" +
            "    COLLECT date = DATE_FORMAT(DATE_TIMESTAMP(e.reqDate), '%dd-%mm-%yyyy')\n" +
            "    AGGREGATE frequency = count(e.reqDate)\n" +
            "    RETURN {date, frequency})\n" +
            "    \n" +
            "LET peakDate = FIRST((FOR e IN graphData\n" +
            "                        SORT e.frequency DESC\n" +
            "                        RETURN e.date))\n" +
            "                        \n" +
            "LET sumFrequency = SUM((FOR e IN graphData\n" +
            "                        RETURN e.frequency))\n" +
            "                        \n" +
            "                        \n" +
            "return {graphData, peakDate, sumFrequency, lastDate: LAST(graphData).date}")
    Map<String, Object> getSpendingFrequencyOverview(@BindVars Map<String, Object> bindVars);

}
