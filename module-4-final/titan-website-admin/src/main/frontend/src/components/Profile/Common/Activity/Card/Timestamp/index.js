import React, { useEffect, useState } from 'react'
import { Modal, Skeleton, Empty } from 'antd'
import axios from 'axios'
import ReactEcharts from 'echarts-for-react'

export default React.memo(({ id, filters, queryUrl, queryParams }) => {
	const [ visible, setVisible ] = useState(false)
	const [ option, setOption ] = useState(null)
	const [ noData, setNoData ] = useState(false)

	useEffect(
		() => {
			const fetchCardTimestampActivity = async () => {
				await axios
					.post(queryUrl, queryParams)
					.then((response) => {
						const data = response.data
						console.log(data)
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
			fetchCardTimestampActivity()
		},
		[ id, filters ]
	)

	const processTimestamp = (timestamp) => {
		const result = []
		const allTimestamps = [ ...new Set(timestamp.map((b) => b.date)) ]
		allTimestamps.forEach((t) => {
			const everyDay = { name: t }
			let success = 0
			let fail = 0
			timestamp.filter((eb) => eb.date === t).forEach((eb) => {
				if (eb.status > 0) {
					success += eb.status_count
				} else {
					fail += eb.status_count
				}
			})
			everyDay['success'] = success
			everyDay['fail'] = fail
			result.push(everyDay)
		})
		return result
	}
	const getOption = (data) => {
		if (data.length > 0) {
			const result = processTimestamp(data)
			return {
				tooltip: {
					trigger: 'item',
					formatter: '{b} : {c}'
				},
				legend: {
					data: [ 'Success', 'Fail' ]
				},
				grid: {
					bottom: 80
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					}
				},
				dataZoom: [
					{
						type: 'slider',
						xAxisIndex: [ 0 ],
						show: true
						// start: 80
					},
					{
						type: 'inside',
						show: true,
						xAxisIndex: [ 0 ]
					}
				],
				xAxis: [
					{
						type: 'category',
						name: 'Bank',
						data: result.map((r) => r.name)
					}
				],
				yAxis: [
					{
						name: 'Frequency',
						type: 'value',
						scale: true,
						min: 0
					}
				],
				toolbox: {
					show: true,
					feature: {
						saveAsImage: {
							title: 'Save',
							name: 'device_merchant_general'
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
				series: [
					{
						name: 'Success',
						type: 'line',
						data: result.map((r) => r.success),
						// label: {
						// 	show: true
						// },
						markLine: {
							data: [ { type: 'average', name: 'average' } ]
						},
						smooth: true
					},
					{
						name: 'Fail',
						type: 'line',
						data: result.map((r) => r.fail),
						// label: {
						// 	show: true
						// },
						markLine: {
							data: [ { type: 'average', name: 'average' } ]
						},
						smooth: true
					}
				],
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		}
	}

	const handleToggleVisible = () => {
		setVisible((old) => !old)
	}

	return noData ? (
		<div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<Empty />
		</div>
	) : option ? (
		<React.Fragment>
			<ReactEcharts
				theme={'infographic'}
				style={{ height: '100%', width: '100%' }}
				option={option}
				notMerge={true}
				lazyUpdate={true}
			/>

			<Modal
				title="Mapping Status"
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
					lazyUpdate={true}
					style={{ height: '35vh' }}
					option={option}
					renderer="canvas"
					style={{ height: '70vh', width: '100%' }}
				/>
			</Modal>
		</React.Fragment>
	) : (
		<Skeleton active />
	)
})
