import React from "react"
import ReactEcharts from "echarts-for-react"
import { Card } from "antd"

export default function Network() {
    const option = {
        title: {
            text: "Graph 简单示例",
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
            {
                type: "graph",
                layout: "none",
                symbolSize: 50,
                roam: true,
                label: {
                    show: true,
                },
                edgeSymbol: ["circle", "arrow"],
                edgeSymbolSize: [4, 10],
                edgeLabel: {
                    fontSize: 20,
                },
                data: [
                    {
                        name: "Same Card",
                        x: 0,
                        y: 0,
                        label: {
                            position: "left",
                        },
                    },
                    {
                        name: "Same Device",
                        x: 0,
                        y: 100,
                        label: {
                            position: "left",
                        },
                    },
                    {
                        name: "23456",
                        x: 200,
                        y: 0,
                        label: {
                            position: "right",
                        },
                    },
                    {
                        name: "86432",
                        x: 200,
                        y: 100,
                        label: {
                            position: "right",
                        },
                    },
                ],
                // links: [],
                links: [
                    {
                        source: "Same Card",
                        target: "23456",
                    },
                    {
                        source: "Same Device",
                        target: "86432",
                    },
                    {
                        source: "Same Card",
                        target: "86432",
                    },
                ],
                lineStyle: {
                    opacity: 0.9,
                    width: 2,
                    curveness: 0,
                },
            },
        ],
    }
    return (
        <Card title='Network' style={{ height: "80vh" }}>
            <ReactEcharts option={option} />
        </Card>
    )
}
