import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Card, Modal } from 'antd'
import { deviceActivitySelector } from '../../../../../../slices/deviceActivity'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
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
						name: `${mf.merchant} - ${mf.merchant_count} - ${mf.merchant_total.toLocaleString('en-EN', {
							style: 'currency',
							currency: 'VND'
						})}`,
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
			<ReactEchartsCore echarts={echarts} option={getOption()} />

			<Modal
				title="Merchant Frequency"
				visible={visible}
				onOk={handleToggleVisible}
				onCancel={handleToggleVisible}
				centered
				width={1000}
				footer={null}
				renderer="canvas"
			>
				<ReactEchartsCore
					echarts={echarts}
					option={getOption()}
					renderer="canvas"
					style={{ height: '70vh', width: '100%' }}
				/>
			</Modal>
		</React.Fragment>
	)
})
