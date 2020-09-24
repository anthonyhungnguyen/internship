import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import { Card, Modal, Select, Button } from 'antd'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'
import { deviceActivitySelector } from '../../../../../../slices/deviceActivity'

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
			legend: {
				data: [ 'App Frequency', 'App Monetary' ]
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			xAxis: [
				{
					type: 'category',
					data: processedData.map((x) => x.app_id)
				}
			],
			yAxis: [
				{
					name: 'Frequency',
					type: 'value',
					scale: true,
					min: 0,
					boundaryGap: [ 0, 0.01 ]
				},
				{
					name: 'Monetary',
					type: 'value',
					scale: true,
					boundaryGap: [ 0, 0.01 ]
				}
			],
			series: [
				{
					name: 'Count',
					type: 'bar',
					data: processedData.map((x) => x.app_id_count)
				},
				{
					name: 'Monetary',
					type: 'line',
					yAxisIndex: 1,
					data: processedData.map((x) => x.app_total)
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

	const handleAddAllAppID = () => {
		setExcludedList([])
	}

	return (
		appid &&
		excludedList && (
			<React.Fragment>
				<div className="flex justify-around">
					<div>
						<p className="font-bold">APP ID</p>
						<Select
							mode="multiple"
							style={{ width: '100%' }}
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
							maxTagCount={6}
						/>
					</div>
					<div>
						<Button onClick={handleAddAllAppID}>Add All</Button>
					</div>
				</div>
				<ReactEchartsCore echarts={echarts} option={getGraphOptions(appid, excludedList)} renderer="canvas" />

				<Modal
					title="Merchant"
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
						renderer="canvas"
					/>
				</Modal>
			</React.Fragment>
		)
	)
}
