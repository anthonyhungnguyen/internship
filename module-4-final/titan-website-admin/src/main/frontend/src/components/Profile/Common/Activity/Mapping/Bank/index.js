import { Empty, Modal, Skeleton } from "antd"
import axios from "axios"
import ReactEcharts from "echarts-for-react"
import React, { memo, useEffect, useState } from "react"

export default memo(function Bank({ queryUrl, queryParams }) {
    const [visible, setVisible] = useState(false)
    const [option, setOption] = useState(null)
    const [noData, setNoData] = useState(false)

    useEffect(() => {
        const fetchBankActivity = async () => {
            await axios
                .post(queryUrl, queryParams)
                .then((response) => {
                    const data = response.data
                    if (data && data.length > 0) {
                        setNoData(false)
                        setOption(getOption(data))
                    } else {
                        setNoData(true)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        const getOption = (data) => {
            if (data.length > 0) {
                const result = processBank(data)
                return {
                    legend: {
                        data: ["Success", "Fail"],
                    },
                    grid: {
                        bottom: 80,
                    },
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "cross",
                            crossStyle: {
                                color: "#999",
                            },
                        },
                    },
                    dataZoom: [
                        {
                            type: "slider",
                            xAxisIndex: [0],
                            show: true,
                            // start: 70
                        },
                        {
                            type: "inside",
                            show: true,
                            xAxisIndex: [0],
                        },
                    ],
                    xAxis: [
                        {
                            type: "category",
                            name: "Bank",
                            data: result.map((r) => r.name),
                            axisLabel: {
                                interval: 0,
                                rotate: -30,
                            },
                        },
                    ],
                    yAxis: [
                        {
                            name: "Frequency",
                            type: "value",
                            scale: true,
                            min: 0,
                        },
                    ],
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                title: "Save",
                                name: "device_merchant_general",
                            },
                            restore: {
                                show: true,
                                title: "Restore",
                            },
                            myFeature: {
                                show: true,
                                title: "Zoom In",
                                icon: `image://${
                                    process.env.PUBLIC_URL +
                                    "/assets/icon/fullscreen.png"
                                }`,
                                onclick: () => {
                                    handleToggleVisible()
                                },
                            },
                        },
                    },
                    series: [
                        {
                            name: "Success",
                            type: "bar",
                            stack: "one",
                            data: result.map((r) => r.success),
                            label: {
                                show: true,
                            },
                            markLine: {
                                data: [{ type: "average", name: "average" }],
                            },
                        },
                        {
                            name: "Fail",
                            type: "bar",
                            stack: "one",
                            data: result.map((r) => r.fail),
                            label: {
                                show: true,
                            },
                            markLine: {
                                data: [{ type: "average", name: "average" }],
                            },
                        },
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                        },
                    },
                }
            }
        }

        const processBank = (bank) => {
            const result = []
            const allBanks = [...new Set(bank.map((b) => b.bName))]
            allBanks.forEach((b) => {
                const everyBank = { name: b }
                let success = 0
                let fail = 0
                bank.filter((eb) => eb.bName === b).forEach((eb) => {
                    if (eb.status > 0) {
                        success += eb.status_count
                    } else {
                        fail += eb.status_count
                    }
                })
                everyBank["success"] = success
                everyBank["fail"] = fail
                result.push(everyBank)
            })
            result.sort((a, b) => a.success + a.fail - b.success - b.fail)
            return result
        }

        fetchBankActivity()
    }, [queryUrl, queryParams])

    const handleToggleVisible = () => {
        setVisible((old) => !old)
    }

    return noData ? (
        <div
            style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Empty />
        </div>
    ) : option ? (
        <React.Fragment>
            <ReactEcharts
                theme={"infographic"}
                style={{ height: "400px" }}
                option={option}
                notMerge={true}
                lazyUpdate={true}
            />

            <Modal
                title='Mapping Status'
                visible={visible}
                onOk={handleToggleVisible}
                onCancel={handleToggleVisible}
                centered
                width={1000}
                footer={null}
                renderer='canvas'
            >
                <ReactEcharts
                    theme={"infographic"}
                    lazyUpdate={true}
                    option={option}
                    renderer='canvas'
                    style={{ height: "70vh", width: "100%" }}
                />
            </Modal>
        </React.Fragment>
    ) : (
        <Skeleton active />
    )
})
