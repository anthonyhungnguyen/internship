import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Card, Modal } from 'antd'
import { deviceActivitySelector } from '../../../../slices/deviceActivity'
import ReactEcharts from 'echarts-for-react'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'

export default React.memo(() => {
	const { merchantFrequency } = useSelector(deviceActivitySelector)
	const [ visible, setVisible ] = useState(false)

	const getOption = () => {
		return {
			tooltip: {
				trigger: 'item',
				formatter: '{b} : {c} ({d}%)'
			},
			series: [
				{
					type: 'pie',
					selectedMode: 'multiple',
					data: merchantFrequency.map((mf) => ({
						name: `${mf.merchant} - ${mf.merchant_count}`,
						value: mf.merchant_count
					})),
					animation: true,
					label: {
						position: 'outer',
						alignTo: 'none',
						bleedMargin: 5
					}
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

	const handleToggleVisible = () => {
		setVisible((old) => !old)
	}

	return (
		<React.Fragment>
			<Card
				title="Merchant Frequency"
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
				title="Merchant Frequency"
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
})
