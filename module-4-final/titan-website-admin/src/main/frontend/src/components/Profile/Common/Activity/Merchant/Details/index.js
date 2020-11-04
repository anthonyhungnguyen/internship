import React, { useState, useEffect, useRef } from "react"
import ReactEcharts from "echarts-for-react"
import { Modal, Skeleton, Select, Empty } from "antd"
import axios from "axios"

export default React.memo(({ id, type, filters }) => {
    const [visible, setVisible] = useState(false)
    const [appid, setAppId] = useState(null)
    const [option, setOption] = useState(null)
    const [noData, setNoData] = useState(false)
    const ref = useRef()

    useEffect(() => {
        const fetchAppIDFrequency = async () => {
            if (type === "userid") {
                await axios
                    .post(
                        `http://localhost:8085/api/profile/user/${id}/merchant/details`,
                        {
                            fromDate: filters.range[0],
                            toDate: filters.range[1],
                        }
                    )
                    .then((response) => {
                        const data = response.data
                        if (data && data.length > 0) {
                            setNoData(false)
                            setAppId(data)
                            setOption(getOption(data))
                        } else {
                            setAppId([])

                            setNoData(true)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else {
                await axios
                    .post(
                        `http://localhost:8085/api/profile/merchant/details`,
                        {
                            id: id,
                            type: type,
                            fromDate: filters.range[0],
                            toDate: filters.range[1],
                        }
                    )
                    .then((response) => {
                        const data = response.data
                        if (data && data.length > 0) {
                            setNoData(false)
                            setAppId(data)
                            setOption(getOption(data))
                        } else {
                            setAppId([])

                            setNoData(true)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }

        const getOption = (data) => {
            const formatMarkPoint = (params) => {
                params.data.value = params.data.value.toLocaleString("en-EN", {
                    style: "currency",
                    currency: "VND",
                })
            }
            if (data.length > 0) {
                return {
                    legend: {
                        data: ["Frequency", "Monetary"],
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
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                title: "Save",
                                name: "device_merchant_details",
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
                    xAxis: {
                        type: "category",
                        name: "App ID",
                        data: data.map((x) => x.app_id),
                    },
                    yAxis: [
                        {
                            name: "Frequency",
                            type: "value",
                            scale: true,
                            min: 0,
                            boundaryGap: [0.2, 0.2],
                        },
                        {
                            name: "VND",
                            type: "value",
                            scale: true,
                            min: 0,
                            boundaryGap: [0.2, 0.2],
                        },
                    ],
                    series: [
                        {
                            name: "Frequency",
                            type: "bar",
                            data: data.map((x) => x.app_id_count),
                        },
                        {
                            name: "Monetary",
                            type: "line",
                            yAxisIndex: 1,
                            markPoint: {
                                label: {
                                    formatter: formatMarkPoint,
                                },
                                data: [
                                    { type: "max", name: "max" },
                                    { type: "min", name: "min" },
                                ],
                            },
                            data: data.map((x) => x.app_total),
                            smooth: true,
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
        fetchAppIDFrequency()
    }, [id, filters, type])

    const handleToggleVisible = () => {
        setVisible((old) => !old)
    }

    const handleSelect = (value) => {
        const currentShownAppID = ref.current.getEchartsInstance().getOption()
            .xAxis[0].data
        const indexToPush = appid.findIndex((x) => x.app_id === value)
        currentShownAppID.splice(indexToPush, 0, value)
        ref.current
            .getEchartsInstance()
            .setOption({ xAxis: { data: currentShownAppID } })
    }

    const handleDeselect = (value) => {
        const currentShownAppID = ref.current.getEchartsInstance().getOption()
            .xAxis[0].data
        ref.current.getEchartsInstance().setOption({
            xAxis: { data: currentShownAppID.filter((x) => x !== value) },
        })
    }

    const handleClear = () => {
        ref.current.getEchartsInstance().setOption({ xAxis: { data: [] } })
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
            <Select
                mode='multiple'
                style={{ width: "51%" }}
                placeholder='Choose AppID'
                defaultValue={appid.map((a) => a.app_id)}
                onSelect={handleSelect}
                onDeselect={handleDeselect}
                options={appid.map((a) => ({
                    value: a.app_id,
                }))}
                maxTagCount={5}
                // bordered={false}
                allowClear={true}
                onClear={handleClear}
            />
            <ReactEcharts
                theme={"infographic"}
                lazyUpdate={true}
                option={option}
                renderer='canvas'
                style={{ height: "400px" }}
                ref={ref}
                notMerge={true}
            />
            {ref.current && (
                <Modal
                    title='Merchant'
                    visible={visible}
                    onOk={handleToggleVisible}
                    onCancel={handleToggleVisible}
                    centered
                    width={1000}
                    footer={null}
                >
                    <ReactEcharts
                        theme={"infographic"}
                        lazyUpdate={true}
                        option={ref.current.getEchartsInstance().getOption()}
                        style={{ height: "70vh", width: "100%" }}
                        renderer='canvas'
                    />
                </Modal>
            )}
        </React.Fragment>
    ) : (
        <Skeleton active />
    )
})
