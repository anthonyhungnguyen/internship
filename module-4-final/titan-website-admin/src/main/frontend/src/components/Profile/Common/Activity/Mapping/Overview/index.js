import React, { useState, useEffect } from "react"
import { Modal, Skeleton, Empty } from "antd"
import axios from "axios"
import ReactEcharts from "echarts-for-react"

export default React.memo(({ queryUrl, queryParams }) => {
    const [visible, setVisible] = useState(false)
    const [option, setOption] = useState(null)
    const [noData, setNoData] = useState(false)

    useEffect(() => {
        const fetchStatusActivity = async () => {
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
                // const preprocessedStatus = preprocessStatus(status)
                return {
                    tooltip: {
                        trigger: "item",
                        formatter: "{b} : {c} ({d}%)",
                    },
                    legend: {
                        orient: "vertical",
                        right: "10",
                        top: "50",
                        data: data.map((s) => s.status),
                        emphasis: {
                            selectorLabel: {
                                show: true,
                            },
                        },
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                title: "Save",
                                name: "mapping_overview",
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
                            type: "pie",
                            selectedMode: "multiple",
                            avoidLabelOverlap: true,
                            label: {
                                show: false,
                                position: "center",
                            },
                            // data: Object.keys(preprocessedStatus).map((mf) => ({
                            // 	name: `${mf} - ${preprocessedStatus[mf]}`,
                            // 	value: preprocessedStatus[mf]
                            // })),
                            data: data.map((s) => ({
                                name: s.status,
                                value: s.status_count,
                            })),
                            animation: true,
                            // label: {
                            // 	position: 'outside',
                            // 	alignTo: 'labelLine',
                            // 	formatter: '{d}'
                            // }
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

        fetchStatusActivity()
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
                // style={{ height: '100%', width: '100%' }}
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
