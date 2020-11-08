import Axios from "axios"
import React, { memo, useEffect, useState } from "react"
import moment from "moment"
import { Card, Col, Row, Skeleton } from "antd"

export default memo(function FundingChannelIdentity({ id }) {
    const [info, setInfo] = useState(null)
    useEffect(() => {
        Axios.get(
            `http://localhost:8085/api/profile/funding_channel/${id}/info`
        )
            .then((response) => {
                const data = response.data
                console.log(data)
                if (data.type === "account") {
                    setInfo({
                        "Account ID": data["accountId"],
                        "Bank Code": data["bankCode"],
                        "Bank Customer ID": data["bankCustomerID"],
                        "Bank Name": data["bankName"],
                        "First Account Number": data["firstAccountNo"],
                        "Last Account Number": data["lastAccountNo"],
                        "KYC DOB":
                            data["KYC DOB"] !== ""
                                ? moment(parseInt(data["kycDob"])).format(
                                      "L LT"
                                  )
                                : "Unknown",
                        "KYC Fullname":
                            data["kycFullName"] !== ""
                                ? data["kycFullName"]
                                : "Unknown",
                        "KYC Gender":
                            data["kycGender"] !== ""
                                ? data["kycGender"]
                                : "Unknown",
                        "KYC ID Type":
                            data["kycIdType"] !== ""
                                ? data["kycIdType"]
                                : "Unknown",
                        "KYC ID Value":
                            data["kycIdValue"] !== ""
                                ? data["kycIdValue"]
                                : "Unknown",
                        "Phone Number": data["phoneNumber"],
                        Type: data["type"],
                    })
                } else if (data.type === "card") {
                    setInfo({
                        "Card ID": data["cardId"],
                        "Card Name": data["cardName"],
                        "Bank Code": data["bankCode"],
                        "Bank Name": data["bankName"],
                        "First Card Number": data["first6CardNo"],
                        "Last Card Number": data["last4CardNo"],
                        "KYC DOB":
                            data["KYC DOB"] !== ""
                                ? moment(parseInt(data["kycDob"])).format(
                                      "L LT"
                                  )
                                : "Unknown",
                        "KYC Fullname":
                            data["kycFullName"] !== ""
                                ? data["kycFullName"]
                                : "Unknown",
                        "KYC Gender":
                            data["kycGender"] !== ""
                                ? data["kycGender"]
                                : "Unknown",
                        "KYC ID Type":
                            data["kycIdType"] !== ""
                                ? data["kycIdType"]
                                : "Unknown",
                        "KYC ID Value":
                            data["kycIdValue"] !== ""
                                ? data["kycIdValue"]
                                : "Unknown",
                        "Phone Number": data["phoneNumber"],
                        Type: data["type"],
                    })
                }
            })
            .catch(console.error)
    }, [id])
    return info ? (
        <Card
            title='Funding Channel Identity'
            headStyle={{ fontWeight: "bold", fontSize: "1.3em" }}
            hoverable={true}
            className='h-full'
        >
            {Object.keys(info).map((k, i) => (
                <Row key={i} gutter={[24, 24]}>
                    <Col span={12} className='font-bold text-base'>
                        {k}
                    </Col>
                    <Col span={12} className='break-words'>
                        {info[k]}
                    </Col>
                </Row>
            ))}
        </Card>
    ) : (
        <Skeleton active />
    )
})
