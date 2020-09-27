import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ReactEcharts from 'echarts-for-react'
import { Card, Modal } from 'antd'
import { userActivitySelector } from '../../../../../slices/userActivity'
export default () => {
	const { spendingFrequency } = useSelector(userActivitySelector)
	const [ visible, setVisible ] = useState(false)

	const getOption = () => {
		if (spendingFrequency.length > 0) {
			const dates = spendingFrequency.map((sf) => sf.date)
			const dateFrequency = spendingFrequency.map((sf) => sf.frequency)
			const amount = spendingFrequency.map((sf) => sf.amount)
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
							icon:
								'image://data:image/png;base64,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',
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
							data: [ { type: 'max', name: 'max' }, { type: 'min', name: 'min' } ]
						},
						markLine: {
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
			}
		}
	}

	const handleToggleVisible = () => {
		setVisible((old) => !old)
	}

	return (
		<React.Fragment>
			<Card
				title="Monetary"
				headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
				hoverable={true}
				renderer="canvas"
			>
				<ReactEcharts theme={'infographic'} style={{ height: '35vh' }} option={getOption()} />
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
				<ReactEcharts option={getOption()} style={{ height: '70vh', width: '100%' }} renderer="canvas" />
			</Modal>
		</React.Fragment>
	)
}
