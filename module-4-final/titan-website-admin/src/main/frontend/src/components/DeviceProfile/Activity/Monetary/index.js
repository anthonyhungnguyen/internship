import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/markLine'
import { Card, Modal } from 'antd'
import { deviceActivitySelector } from '../../../../slices/deviceActivity'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'

export default () => {
	const { spendingFrequency } = useSelector(deviceActivitySelector)
	const [ visible, setVisible ] = useState(false)

	const getOption = () => {
		if (spendingFrequency.length > 0) {
			return {
				title: {
					text: `${spendingFrequency[0].date} - ${spendingFrequency[spendingFrequency.length - 1].date}`
				},
				tooltip: {
					trigger: 'axis'
				},
				xAxis: {
					type: 'category',
					data: spendingFrequency.map((sf) => sf.date)
				},
				yAxis: {
					type: 'value'
				},
				color: '#d62828',
				series: [
					{
						data: spendingFrequency.map((sf) => sf.amount),
						type: 'line',
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
				text: `No Records`
			},
			tooltip: {
				trigger: 'axis'
			},
			xAxis: {
				type: 'category',
				data: []
			},
			yAxis: {
				type: 'value'
			},
			color: '#d62828',
			series: [
				{
					data: [],
					type: 'line',
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

	const handleToggleVisible = () => {
		setVisible((old) => !old)
	}

	return (
		<React.Fragment>
			<Card
				title="Monetary"
				headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
				hoverable={true}
				extra={
					<button onClick={handleToggleVisible}>
						{visible ? (
							<FullscreenExitOutlined className="text-xl" />
						) : (
							<FullscreenOutlined className="text-xl" />
						)}
					</button>
				}
			>
				<ReactEchartsCore echarts={echarts} option={getOption()} />
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
				<ReactEchartsCore echarts={echarts} option={getOption()} style={{ height: '70vh', width: '100%' }} />
			</Modal>
		</React.Fragment>
	)
}
