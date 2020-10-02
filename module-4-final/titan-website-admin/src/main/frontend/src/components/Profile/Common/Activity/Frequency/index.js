import React, { useState, useEffect } from 'react'
import ReactEcharts from 'echarts-for-react'
import { Card, Modal, Skeleton, Empty } from 'antd'
import axios from 'axios'

export default React.memo(({ id, type, filters }) => {
	const [ visible, setVisible ] = useState(false)
	const [ option, setOption ] = useState(null)
	const [ noData, setNoData ] = useState(false)

	useEffect(
		() => {
			const deviceOnBoardFrequency = async () => {
				await axios
					.post(`http://localhost:8085/api/profile/frequency`, {
						type: type,
						id: id,
						dateFormat: '%dd-%mm-%yyyy',
						fromDate: filters.range[0],
						toDate: filters.range[1]
					})
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
			deviceOnBoardFrequency()
		},
		[ id, filters ]
	)

	const getOption = (data) => {
		if (data.length > 0) {
			const dates = data.map((e) => e.date)
			const eachDateCount = data.map((e) => e.date_count)
			const totalCount = eachDateCount.reduce((a, b) => a + b)

			return {
				title: {
					text: `Total Active Times: ${totalCount}`
				},
				legend: {
					data: [ 'App Frequency', 'App Monetary' ]
				},
				dataZoom: [
					{
						type: 'slider',
						show: true,
						// start: 80,
						xAxisIndex: [ 0 ]
					},
					{
						type: 'inside',
						show: true,
						xAxisIndex: [ 0 ]
					}
				],
				color: [ '#118ab2' ],
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					}
				},
				toolbox: {
					show: true,
					feature: {
						saveAsImage: {
							title: 'Save Device Frequency',
							name: 'device_frequency'
						},
						restore: {
							show: true,
							title: 'Restore'
						},
						myFeature: {
							show: true,
							title: 'Zoom In',
							icon: `image://${process.env.PUBLIC_URL + '/assets/icon/fullscreen.png'}`,
							onclick: () => {
								handleToggleVisible()
							}
						}
					}
				},
				xAxis: {
					name: 'Date',
					data: dates,
					axisTick: {
						alignWithLabel: true
					}
				},
				yAxis: {
					name: 'Frequency'
				},
				series: [
					{
						type: 'bar',
						data: eachDateCount,
						label: {
							show: true,
							position: 'top'
						},
						markLine: {
							data: [ { type: 'average', name: 'average' } ]
						}
					}
				]
			}
		}
	}

	const handleToggleVisible = () => {
		setVisible((old) => !old)
	}

	return noData ? (
		<Card
			title="Frequency"
			headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
			hoverable={true}
			bodyStyle={{ height: '48.4vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
		>
			<Empty />
		</Card>
	) : option ? (
		<React.Fragment>
			<Card
				title="Frequency"
				headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
				hoverable={true}
				bodyStyle={{ height: '46.6vh' }}
			>
				<ReactEcharts
					theme={'infographic'}
					lazyUpdate={true}
					option={option}
					style={{ height: '100%' }}
					renderer="canvas"
					notMerge={true}
				/>
			</Card>
			<Modal
				title="Frequency"
				visible={visible}
				onOk={handleToggleVisible}
				onCancel={handleToggleVisible}
				centered
				width={1000}
				footer={null}
				renderer="canvas"
			>
				<ReactEcharts
					theme={'infographic'}
					option={option}
					style={{ height: '70vh', width: '100%' }}
					lazyUpdate={true}
				/>
			</Modal>
		</React.Fragment>
	) : (
		<Skeleton active />
	)
})
