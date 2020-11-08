import { Card, Col, Divider, Row, Skeleton, Statistic } from "antd"
import axios from "axios"
import ReactEcharts from "echarts-for-react"
import React, { memo, useEffect, useState } from "react"
export default memo(function Payment({ id, filters, queryUrl, queryParams }) {
    const [monetaryStatistics, setMonetaryStatistics] = useState(null)
    useEffect(() => {
        axios
            .post(queryUrl, queryParams)
            .then((response) => setMonetaryStatistics(response.data))
            .catch(console.error)
    }, [id, filters, queryUrl, queryParams])
    return monetaryStatistics ? (
        <Card hoverable={true} className='h-full'>
            <Row>
                <Col span={14}>
                    <Statistic
                        title='Monetary'
                        value={monetaryStatistics["totalAmount"] ?? 0}
                        suffix='VND'
                    />
                </Col>
                <Col span={10}>
                    <ReactEcharts
                        theme='walden'
                        style={{ height: "100%", width: "100%" }}
                        option={{
                            tooltip: {},
                            xAxis: {
                                type: "category",
                                data: monetaryStatistics["graphData"].map(
                                    (x) => x["date"]
                                ),
                                show: false,
                            },
                            yAxis: {
                                type: "value",
                                show: false,
                            },
                            series: [
                                {
                                    data: monetaryStatistics["graphData"].map(
                                        (x) => x["amount"]
                                    ),
                                    type: "line",
                                    smooth: true,
                                    areaStyle: {},
                                },
                            ],
                        }}
                    />
                </Col>
            </Row>
            <Divider />
            <Row>
                <Col span={10}>
                    <Statistic
                        title='Success'
                        value={parseInt(
                            monetaryStatistics["totalPaymentCount"] !== 0
                                ? parseFloat(
                                      (monetaryStatistics["successTransCount"] /
                                          monetaryStatistics[
                                              "totalPaymentCount"
                                          ]) *
                                          100
                                  )
                                : 0
                        )}
                        precision={2}
                        valueStyle={{ color: "#3f8600" }}
                        suffix='%'
                    />
                </Col>
                <Col span={14}>
                    <Statistic
                        title='Popular merchant'
                        value={
                            monetaryStatistics["popularMerchant"] ?? "Unknown"
                        }
                        valueStyle={{ color: "#cf1322" }}
                    />
                </Col>
            </Row>
        </Card>
    ) : (
        <Skeleton />
    )
})
