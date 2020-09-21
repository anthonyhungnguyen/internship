import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import { Card, Modal, Select } from 'antd'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'
import { deviceActivitySelector } from '../../../../../slices/deviceActivity'

export default () => {
	const { appid } = useSelector(deviceActivitySelector)
	const [ visible, setVisible ] = useState(false)
	const [ excludedList, setExcludedList ] = useState(null)

	useEffect(() => {
		setExcludedList(appid.map((x) => x.app_id).slice(0, -5))
	}, [])

	const getGraphOptions = (data, excludedList) => {
		const processedData = data.filter((d) => !excludedList.includes(d.app_id))

		return {
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
			yAxis: {
				type: 'value',
				boundaryGap: [ 0, 0.01 ]
			},
			xAxis: {
				type: 'category',
				data: processedData.map((x) => x.app_id)
			},
			series: [
				{
					type: 'bar',
					data: processedData.map((x) => x.app_id_count)
				}
			]
		}
	}

	const handleToggleVisible = () => {
		setVisible((old) => !old)
	}

	const handleSelectAppId = (e) => {
		setExcludedList((old) => old.filter((o) => o !== e))
	}

	const handleDeselectAppId = (e) => {
		setExcludedList((old) => [ ...old, e ])
	}

	const handleOnClear = () => {
		setExcludedList(appid.map((d) => d.app_id))
	}

	return (
		appid &&
		excludedList && (
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
					<span className="mx-2 font-bold">APP ID</span>
					<Select
						mode="multiple"
						style={{ width: '50%', margin: 'center' }}
						placeholder="Please select"
						defaultValue={appid
							.filter((x) => !excludedList.includes(x.app_id))
							.reverse()
							.map((x) => x.app_id)}
						onSelect={handleSelectAppId}
						onDeselect={handleDeselectAppId}
						options={appid.map((x) => ({
							value: x.app_id
						}))}
						onClear={handleOnClear}
						allowClear={true}
						maxTagCount={4}
					/>
					<ReactEchartsCore echarts={echarts} option={getGraphOptions(appid, excludedList)} />
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
					<ReactEchartsCore
						echarts={echarts}
						option={getGraphOptions(appid, excludedList)}
						style={{ height: '70vh', width: '100%' }}
					/>
				</Modal>
			</React.Fragment>
		)
	)
}
