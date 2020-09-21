import React, { useState } from 'react'
import { useSelector } from 'react-redux/'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import { deviceActivitySelector } from '../../../../slices/deviceActivity'
import { Card, Modal } from 'antd'
import { FullscreenOutlined } from '@ant-design/icons'

export default function() {
	const { timestamps } = useSelector(deviceActivitySelector)
	const [ visible, setVisible ] = useState(false)
	const getOption = () => {
		if (timestamps.length > 0) {
			return {
				title: {
					text: `${timestamps[0].date} - ${timestamps[timestamps.length - 1].date}`
				},
				color: [ '#118ab2' ],
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
					data: timestamps.map((e) => e.date),
					axisTick: {
						alignWithLabel: true
					}
				},
				yAxis: {},
				series: [
					{
						type: 'bar',
						data: timestamps.map((e) => e.date_count),
						label: {
							show: true,
							position: 'top'
						}
					}
				]
			}
		}
		return {}
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
				extra={
					<button onClick={handleToggleVisible}>
						<FullscreenOutlined className="text-xl" />
					</button>
				}
			>
				<ReactEchartsCore echarts={echarts} option={getOption()} />
			</Card>
			<Modal
				title="Activity Date Frequency"
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
