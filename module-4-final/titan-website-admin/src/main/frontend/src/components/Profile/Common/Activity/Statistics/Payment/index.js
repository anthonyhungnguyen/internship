import { Card, Col, Divider, Row, Skeleton, Statistic } from "antd"
import axios from "axios"
import ReactEcharts from "echarts-for-react"
import React, { memo, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { generalSelector } from "../../../../../../slices"

export default memo(function Payment({ id, filters, queryUrl, queryParams }) {
    const { type } = useSelector(generalSelector)
    const [monetaryStatistics, setMonetaryStatistics] = useState(null)
    useEffect(() => {
        if (type === "users") {
            axios
                .post(queryUrl, { ...queryParams, id: `userid/${id}` })
                .then((response) => setMonetaryStatistics(response.data))
                .catch(console.error)
        } else {
            axios
                .post(queryUrl, { ...queryParams, id: `${type}/${id}` })
                .then((response) => setMonetaryStatistics(response.data))
                .catch(console.error)
        }
    }, [id, filters, queryUrl, queryParams, type])
    return monetaryStatistics ? (
        <Card hoverable={true}>
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
                <Col span={12}>
                    <Statistic
                        title='Success'
                        value={parseFloat(
                            monetaryStatistics["successRate"] * 100
                        )}
                        precision={2}
                        valueStyle={{ color: "#3f8600" }}
                        suffix='%'
                    />
                </Col>
                <Col>
                    <Statistic
                        title='Popular type'
                        value={
                            monetaryStatistics["popularMerchant"] ?? "Unknown"
                        }
                        valueStyle={{ color: "#cf1322" }}
                    />
                </Col>
            </Row>
        </Card>
    ) : (
        <Skeleton active />
    )
})
