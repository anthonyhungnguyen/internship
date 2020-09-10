import React from 'react'
import { useSelector } from 'react-redux/'
import ReactEcharts from 'echarts-for-react'
import { deviceActivitySelector } from '../../../../slices/deviceActivity'
import { Card, Skeleton } from 'antd'

export default function() {
	const { loading, formattedTimestamps } = useSelector(deviceActivitySelector)

	const getOption = () => {
		return {
			color: [ '#3398DB' ],
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
	return !loading ? (
		<Card title="Activity Date Frequency">
			<ReactEcharts
				option={getOption()}
				style={{ height: '500px', width: '100%' }}
				opts={{ renderer: 'svg' }}
				className="react_for_echarts"
			/>
		</Card>
	) : (
		<Skeleton active />
	)
}
