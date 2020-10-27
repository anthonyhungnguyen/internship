import Axios from 'axios'
import ReactEcharts from 'echarts-for-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { generalSelector } from '../../../../../slices/general'

export default function CardNetwork() {
    const { id } = useSelector(generalSelector)
    const [option, setOption] = useState(null)

    useEffect(() => {
        const fetchNetworkCard = async () => {
            await Axios.post(
                'http://localhost:8085/api/profile/user/network/card',
                {
                    id: `userid/${id}`,
                }
            ).then((response) => {
                setOption(getOptionCard(response.data))
            })
        }

        const getOptionCard = (data) => {
            const sourceTarget = data
                .map((x) => {
                    return x.userList.map((z) => ({
                        source: `cardid/${x.cardId}`,
                        target: z,
                        value: 1,
                    }))
                })
                .flat()

            return {
                backgroundColor: '#FFFFFF',
                series: [
                    {
                        type: 'sankey',
                        data: [
                            ...new Set(sourceTarget.map((x) => x.target)),
                            ...new Set(sourceTarget.map((x) => x.source)),
                        ].map((x) => ({ name: x })),
                        links: sourceTarget,
                        lineStyle: {
                            color: 'source',
                            curveness: 0.5,
                        },
                        itemStyle: {
                            color: '#1f77b4',
                            borderColor: '#1f77b4',
                        },
                        label: {
                            color: 'rgba(0,0,0,0.7)',
                            fontFamily: 'Arial',
                            fontSize: 10,
                        },
                    },
                ],
                tooltip: {
                    trigger: 'item',
                },
            }
        }

        fetchNetworkCard()
    }, [])

    return (
        option && <ReactEcharts option={option} style={{ height: '2000px' }} />
    )
}
