import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ReactEcharts from 'echarts-for-react'
import { Card, Modal } from 'antd'
import { deviceActivitySelector } from '../../../../slices/deviceActivity'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'

export default () => {
	const { spendingFrequency } = useSelector(deviceActivitySelector)
	const [ visible, setVisible ] = useState(false)

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

	const handleToggleVisible = () => {
		setVisible((old) => !old)
	}

	return (
		<React.Fragment>
			<Card
				title="Spending Statistics"
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
				<ReactEcharts option={getOption()} className="react_for_echarts" opts={{ renderer: 'svg' }} />
			</Card>
			<Modal
				title="Spending Statistics"
				visible={visible}
				onOk={handleToggleVisible}
				onCancel={handleToggleVisible}
				centered
				width={1000}
				footer={null}
			>
				<ReactEcharts
					option={getOption()}
					style={{ height: '500px', width: '100%' }}
					className="react_for_echarts"
					opts={{ renderer: 'svg' }}
				/>
			</Modal>
		</React.Fragment>
	)
}
