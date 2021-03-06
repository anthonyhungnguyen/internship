import { Card, Col, Divider, Row, Skeleton, Statistic } from "antd"
import axios from "axios"
import ReactEcharts from "echarts-for-react"
import React, { memo, useEffect, useState } from "react"

export default memo(function Mapping({ queryUrl, queryParams }) {
    const [mappingStatistics, setMappingStatistics] = useState(null)

    useEffect(() => {
        axios
            .post(queryUrl, queryParams)
            .then((response) => setMappingStatistics(response.data))
            .catch(console.error)
    }, [queryUrl, queryParams])

    return mappingStatistics ? (
        <Card hoverable={true} className='h-full'>
            <Row>
                <Col span={8}>
                    <Statistic
                        title='Mapping'
                        value={mappingStatistics["totalMappingTimes"] ?? 0}
                        suffix='times'
                    />
                </Col>
                <Col span={16}>
                    <ReactEcharts
                        style={{ height: "100%", width: "100%" }}
                        option={{
                            tooltip: {
                                trigger: "item",
                                formatter: "{a} <br/>{b}: {c} ({d}%)",
                            },
                            series: [
                                {
                                    name: "Overview",
                                    type: "pie",
                                    radius: ["50%", "70%"],
                                    label: {
                                        position: "outside",
                                        alignTo: "none",
                                    },
                                    top: 15,
                                    emphasis: {
                                        label: {
                                            show: true,
                                            fontSize: "10",
                                            fontWeight: "bold",
                                        },
                                    },
                                    labelLine: {
                                        show: true,
                                    },
                                    data: [
                                        {
                                            value:
                                                mappingStatistics["card"] ?? 0,
                                            name: "Card",
                                        },
                                        {
                                            value:
                                                mappingStatistics["account"] ??
                                                0,
                                            name: "Account",
                                        },
                                    ],
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
                        value={mappingStatistics["successPercent"] ?? 0}
                        precision={2}
                        valueStyle={{ color: "#3f8600" }}
                        suffix='%'
                    />
                </Col>
                <Col span={14}>
                    <Statistic
                        title='Popular Bank'
                        value={mappingStatistics["popularBank"] ?? "Unknown"}
                        valueStyle={{ color: "#3498db" }}
                    />
                </Col>
            </Row>
        </Card>
    ) : (
        <Skeleton />
    )
})
