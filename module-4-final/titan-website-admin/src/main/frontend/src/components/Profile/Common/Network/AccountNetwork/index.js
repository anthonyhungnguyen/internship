import Axios from "axios"
import ReactEcharts from "echarts-for-react"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { generalSelector } from "../../../../../slices/general"

export default function AccountNetwork() {
    const { id } = useSelector(generalSelector)
    const [option, setOption] = useState(null)

    useEffect(() => {
        const fetchNetwork = async () => {
            await Axios.post(
                "http://localhost:8085/api/profile/user/network/account",
                {
                    id: `userid/${id}`,
                }
            ).then((response) => {
                setOption(getOption(response.data))
            })
        }

        const getOption = (data) => {
            const sourceTarget = data
                .map((x) => {
                    return x.userList.map((z) => ({
                        source: `accountid/${x.accountId}`,
                        target: z,
                        value: 1,
                    }))
                })
                .flat()

            return {
                backgroundColor: "#FFFFFF",
                series: [
                    {
                        type: "sankey",
                        data: [
                            ...new Set(sourceTarget.map((x) => x.target)),
                            ...new Set(sourceTarget.map((x) => x.source)),
                        ].map((x) => ({ name: x })),
                        links: sourceTarget,
                        lineStyle: {
                            color: "source",
                            curveness: 0.5,
                        },
                        itemStyle: {
                            color: "#1f77b4",
                            borderColor: "#1f77b4",
                        },
                        label: {
                            color: "rgba(0,0,0,0.7)",
                            fontFamily: "Arial",
                            fontSize: 10,
                        },
                    },
                ],
                tooltip: {
                    trigger: "item",
                },
            }
        }

        fetchNetwork()
    }, [])

    return option && <ReactEcharts option={option} style={{ height: "80vh" }} />
}
