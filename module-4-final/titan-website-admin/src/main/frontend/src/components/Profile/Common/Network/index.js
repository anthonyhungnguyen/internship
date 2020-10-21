import React from 'react'
import ReactEcharts from 'echarts-for-react'

export default function Network() {
    const data = {
        nodes: [
            { name: 'Billing address fingerprint' },
            { name: 'Billing name fingerprint' },
            { name: 'IP Address' },
            { name: 'Device fingerprint' },
            { name: 'aragog8898' },
            { name: 'Patel1152' },
            { name: 'basilisk692' },
        ],
        links: [
            {
                source: 'Billing address fingerprint',
                target: 'aragog8898',
                value: 0.1,
            },
            {
                source: 'Billing name fingerprint',
                target: 'aragog8898',
                value: 0.1,
            },
            {
                source: 'IP Address',
                target: 'Patel1152',
                value: 0.1,
            },
            {
                source: 'IP Address',
                target: 'basilisk692',
                value: 0.1,
            },
            {
                source: 'Device fingerprint',
                target: 'aragog8898',
                value: 0.1,
            },
        ],
    }

    const options = {
        title: {
            text: 'Sankey Diagram',
        },
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
        },
        series: [
            {
                type: 'sankey',
                data: data.nodes,
                links: data.links,
                focusNodeAdjacency: true,
                levels: [
                    {
                        depth: 0,
                        itemStyle: {
                            color: '#fbb4ae',
                        },
                        lineStyle: {
                            color: 'source',
                            opacity: 0.6,
                        },
                    },
                    {
                        depth: 1,
                        itemStyle: {
                            color: '#b3cde3',
                        },
                        lineStyle: {
                            color: 'source',
                            opacity: 0.6,
                        },
                    },
                    {
                        depth: 2,
                        itemStyle: {
                            color: '#ccebc5',
                        },
                        lineStyle: {
                            color: 'source',
                            opacity: 0.6,
                        },
                    },
                    {
                        depth: 3,
                        itemStyle: {
                            color: '#decbe4',
                        },
                        lineStyle: {
                            color: 'source',
                            opacity: 0.6,
                        },
                    },
                ],
                lineStyle: {
                    curveness: 0.5,
                },
            },
        ],
    }

    return (
        <div>
            <ReactEcharts option={options} />
        </div>
    )
}
