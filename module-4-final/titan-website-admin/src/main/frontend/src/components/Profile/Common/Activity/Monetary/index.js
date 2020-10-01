import React, { useState, useEffect } from 'react'
import ReactEcharts from 'echarts-for-react'
import { Card, Empty, Modal, Skeleton } from 'antd'
export default React.memo(({ id, filters }) => {
	const [ visible, setVisible ] = useState(false)
	const [ option, setOption ] = useState(null)
	const [ noData, setNoData ] = useState(false)

	useEffect(
		() => {
			const fetchMonetaryFrequency = async () => {
				const response = await fetch('http://localhost:8085/api/user_device/test', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						query: `FOR v, e IN 1..1 ANY @id user_device_transaction
						FILTER e.merchant != 'Money Transfer' AND DATE_TIMESTAMP(e.reqDate) >= DATE_TIMESTAMP(@fromDate) AND DATE_TIMESTAMP(e.reqDate) <= DATE_TIMESTAMP(@toDate)
						COLLECT date = DATE_FORMAT(DATE_TIMESTAMP(e.reqDate), '%dd-%mm-%yyyy')
						AGGREGATE amount = SUM(TO_NUMBER(e.amount)), frequency = count(e.reqDate)
						RETURN {date, amount, frequency}`,
						bindVars: {
							id: id,
							fromDate: filters.range[0],
							toDate: filters.range[1]
						}
					})
				})

				const data = await response.json()
				if (data && data.length > 0) {
					setNoData(false)
					setOption(getOption(data))
				} else {
					setNoData(true)
				}
			}
			fetchMonetaryFrequency()
		},
		[ id, filters ]
	)

	const getOption = (data) => {
		const formatMarkPoint = (params) => {
			params.data.value = params.data.value.toLocaleString('en-EN', {
				style: 'currency',
				currency: 'VND'
			})
		}

		if (data.length > 0) {
			const dates = data.map((sf) => sf.date)
			const dateFrequency = data.map((sf) => sf.frequency)
			const amount = data.map((sf) => sf.amount)
			const amountSum = amount.reduce((a, b) => a + b)

			return {
				title: {
					text: `Total Spending: ${amountSum.toLocaleString('en-EN', {
						style: 'currency',
						currency: 'VND'
					})}`
				},
				legend: {
					data: [ 'Frequency', 'Monetary' ]
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
						show: true,
						xAxisIndex: [ 0 ]
					},
					{
						type: 'inside',
						show: true,
						xAxisIndex: [ 0 ]
					}
				],
				toolbox: {
					show: true,
					feature: {
						saveAsImage: {
							title: 'Save',
							name: 'device_spending'
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
					type: 'category',
					name: 'Date',
					data: dates
				},
				yAxis: [
					{
						name: 'Frequency',
						type: 'value',
						scale: true,
						min: 0,
						boundaryGap: [ 0.2, 0.2 ]
					},
					{
						name: 'VND',
						type: 'value',
						scale: true,
						min: 0,
						boundaryGap: [ 0.2, 0.2 ],
						splitLine: {
							show: false
						}
					}
				],
				series: [
					{
						name: 'Frequency',
						type: 'bar',
						data: dateFrequency
					},
					{
						name: 'Monetary',
						data: amount,
						type: 'line',
						yAxisIndex: 1,
						markPoint: {
							label: {
								formatter: formatMarkPoint
							},
							data: [ { type: 'max', name: 'max' }, { type: 'min', name: 'min' } ]
						},
						markLine: {
							label: {
								formatter: formatMarkPoint
							},
							data: [ { type: 'average', name: 'average' } ]
						},
						smooth: true
					}
				]
			}
		}
		return {
			title: {
				text: 'No Records'
			},
			xAxis: { data: [] },
			yAxis: { data: [] },
			series: [ { data: [] } ]
		}
	}

	const handleToggleVisible = () => {
		setVisible((old) => !old)
	}

	return noData ? (
		<Card title="Monetary" headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }} hoverable={true}>
			<Empty />
		</Card>
	) : option ? (
		<React.Fragment>
			<Card
				title="Monetary"
				headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
				hoverable={true}
				renderer="canvas"
			>
				<ReactEcharts
					theme={'infographic'}
					lazyUpdate={true}
					style={{ height: '35vh' }}
					option={option}
					notMerge={true}
					renderer="canvas"
				/>
			</Card>
			<Modal
				title="Monetary"
				visible={visible}
				onOk={handleToggleVisible}
				onCancel={handleToggleVisible}
				centered
				width={1000}
				footer={null}
			>
				<ReactEcharts
					option={option}
					style={{ height: '70vh', width: '100%' }}
					renderer="canvas"
					lazyUpdate={true}
				/>
			</Modal>
		</React.Fragment>
	) : (
		<Skeleton active />
	)
})
