import React, { useState } from 'react'
import { useSelector } from 'react-redux/'
import ReactEcharts from 'echarts-for-react'
import { deviceActivitySelector } from '../../../../slices/deviceActivity'
import { Card, Modal } from 'antd'

export default function () {
	const { formattedTimestamps } = useSelector(deviceActivitySelector)
	const [visible, setVisible] = useState(false)

	const getOption = () => {
		return {
			title: {
				text: `${formattedTimestamps[0].date} - ${formattedTimestamps[formattedTimestamps.length - 1].date}`
			},
			color: ['#3398DB'],
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				data: formattedTimestamps.map((e) => e.date),
				axisTick: {
					alignWithLabel: true
				}
			},
			yAxis: {},
			series: [
				{
					type: 'bar',
					data: formattedTimestamps.map((e) => e.count),
					label: {
						show: true,
						position: 'top'
					}
				}
			]
		}
	}

	const handleToggleVisible = () => {
		setVisible((old) => !old)
	}

	return (
		<React.Fragment>
			<Card
				title="Activity Date Frequency"
				headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
				hoverable={true}
				onClick={handleToggleVisible}
			>
				<ReactEcharts option={getOption()} opts={{ renderer: 'svg' }} className="react_for_echarts" />
			</Card>
			<Modal
				title="Activity Date Frequency"
				visible={visible}
				onOk={handleToggleVisible}
				onCancel={handleToggleVisible}
				centered
				width={1000}
			>
				<ReactEcharts
					option={getOption()}
					style={{ height: '500px', width: '100%' }}
					opts={{ renderer: 'svg' }}
					className="react_for_echarts"
				/>
			</Modal>
		</React.Fragment>
	)
}
