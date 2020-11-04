import React, { useState, useEffect } from "react"
import { Empty, Modal, Skeleton } from "antd"
import ReactEcharts from "echarts-for-react"
import axios from "axios"

export default React.memo(({ id, type, filters }) => {
    const [visible, setVisible] = useState(false)
    const [option, setOption] = useState(null)
    const [noData, setNoData] = useState(false)

    useEffect(() => {
        const fetchGeneralMerchantAcitivty = async () => {
            if (type === "userid") {
                await axios
                    .post(
                        `http://localhost:8085/api/profile/user/${id}/merchant/overview`,
                        {
                            fromDate: filters.range[0],
                            toDate: filters.range[1],
                        }
                    )
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
            } else {
                await axios
                    .post(
                        `http://localhost:8085/api/profile/merchant/overview`,
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
                            setOption(getOption(data))
                        } else {
                            setNoData(true)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
        const getOption = (data) => {
            if (data.length > 0) {
                return {
                    tooltip: {
                        trigger: "item",
                        formatter: "{b} : {c} ({d}%)",
                    },
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
                            type: "pie",
                            selectedMode: "multiple",
                            data: data.map((mf) => ({
                                name: `${mf.merchant} - ${
                                    mf.merchant_count
                                } - ${mf.merchant_total.toLocaleString(
                                    "en-EN",
                                    {
                                        style: "currency",
                                        currency: "VND",
                                    }
                                )}`,
                                value: mf.merchant_count,
                            })),
                            animation: true,
                            label: {
                                position: "outside",
                                alignTo: "none",
                                bleedMargin: 5,
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
        fetchGeneralMerchantAcitivty()
    }, [id, filters, type])

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
                lazyUpdate={true}
                style={{ height: "400px" }}
                option={option}
                notMerge={true}
                renderer='canvas'
            />

            <Modal
                title='Merchant Frequency'
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
                    style={{ height: "70vh" }}
                    option={option}
                    renderer='canvas'
                />
            </Modal>
        </React.Fragment>
    ) : (
        <Skeleton active />
    )
})
