import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ReactEcharts from 'echarts-for-react'
import { Card, Modal } from 'antd'
import { deviceActivitySelector } from '../../../../slices/deviceActivity'
import moment from 'moment'

export default (() => {
    const { spendingFrequency } = useSelector(deviceActivitySelector)
    const [visible, setVisible] = useState(false)

    const getOption = () => {
        return {
            title: {
                text: `${spendingFrequency[0].date} - ${spendingFrequency[spendingFrequency.length - 1].date}`
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: spendingFrequency.map(sf => sf.date)
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: spendingFrequency.map(sf => sf.amount),
                type: 'line',
                markPoint: {
                    data: [
                        { type: 'max', name: 'max' },
                        { type: 'min', name: 'min' }
                    ],
                }, markLine: {
                    data: [
                        { type: 'average', name: 'average' }
                    ]
                }
            }]
        };

    }

    const handleToggleVisible = () => {
        setVisible((old) => !old)
    }

    return (
        <React.Fragment>
            <Card
                title="Spending Statistics"
                headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
                hoverable={true}
                onClick={handleToggleVisible}
            >
                <ReactEcharts option={getOption()} className="react_for_echarts" />
            </Card>
            <Modal
                title="Spending Statistics"
                visible={visible}
                onOk={handleToggleVisible}
                onCancel={handleToggleVisible}
                centered
                width={1000}
            >
                <ReactEcharts
                    option={getOption()}
                    style={{ height: '500px', width: '100%' }}
                    className="react_for_echarts"
                />
            </Modal>
        </React.Fragment>
    )
})
