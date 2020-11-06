import { Card, Col, Divider, Row, Skeleton, Statistic } from "antd"
import axios from "axios"
import ReactEcharts from "echarts-for-react"
import React, { memo, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { generalSelector } from "../../../../../../slices"

export default memo(function Frequency({ id, queryUrl, queryParams }) {
    const { type } = useSelector(generalSelector)
    const [monetaryFrequencyOverview, setMonetaryFrequencyOverview] = useState(
        null
    )

    useEffect(() => {
        if (type === "users") {
            axios
                .post(queryUrl, { ...queryParams, id: `userid/${id}` })
                .then((response) => setMonetaryFrequencyOverview(response.data))
                .catch(console.error)
        } else {
            axios
                .post(queryUrl, { ...queryParams, id: `${type}/${id}` })
                .then((response) => setMonetaryFrequencyOverview(response.data))
                .catch(console.error)
        }
    }, [queryUrl, queryParams, type, id])

    return monetaryFrequencyOverview ? (
        <Card hoverable={true}>
            <Row>
                <Col span={12}>
                    <Statistic
                        title='Frequency'
                        value={monetaryFrequencyOverview["sumFrequency"] ?? 0}
                        suffix='times'
                    />
                </Col>
                <Col span={12}>
                    <ReactEcharts
                        theme='walden'
                        style={{ height: "100%", width: "100%" }}
                        option={{
                            tooltip: {},
                            xAxis: {
                                type: "category",
                                show: false,
                                data: monetaryFrequencyOverview[
                                    "graphData"
                                ].map((x) => x["date"]),
                            },
                            yAxis: {
                                type: "value",
                                show: false,
                            },
                            series: [
                                {
                                    data: monetaryFrequencyOverview[
                                        "graphData"
                                    ].map((x) => x["frequency"]),
                                    type: "bar",
                                    backgroundStyle: {
                                        color: "rgba(220, 220, 220, 0.8)",
                                    },
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
                        title='Peak date'
                        value={
                            monetaryFrequencyOverview["peakDate"] ?? "Unknown"
                        }
                        precision={2}
                        valueStyle={{ color: "#e67e22" }}
                    />
                </Col>
                <Col>
                    <Statistic
                        title='Recency'
                        value={
                            monetaryFrequencyOverview["lastDate"] ?? "Unknown"
                        }
                        valueStyle={{ color: "#34495e" }}
                    />
                </Col>
            </Row>
        </Card>
    ) : (
        <Skeleton active />
    )
})
