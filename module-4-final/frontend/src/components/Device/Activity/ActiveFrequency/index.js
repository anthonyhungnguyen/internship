import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux/'
import { formatTimestamp, deviceActivitySelector } from '../../../../slices/device_activity'
import ReactEcharts from 'echarts-for-react'
export default function() {
	const dispatch = useDispatch()
	const { loading, timestamps, formattedTimestamps } = useSelector(deviceActivitySelector)
	useEffect(
		() => {
			dispatch(formatTimestamp(timestamps))
		},
		[ dispatch, timestamps ]
	)
	const getOption = () => {
		return {
			title: {
				text: 'Active Date Frequency'
			},
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
	return (
		<div className="examples">
			<div className="parent">
				{!loading && (
					<ReactEcharts
						option={getOption()}
						style={{ height: '500px', width: '100vw' }}
						opts={{ renderer: 'svg' }}
						className="react_for_echarts"
					/>
				)}
			</div>
		</div>
	)
}
