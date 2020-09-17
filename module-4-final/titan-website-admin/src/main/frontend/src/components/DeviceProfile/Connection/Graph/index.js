import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import ReactEcharts from 'echarts-for-react'
import { Card, Slider } from 'antd'
import { deviceConnectionSelector } from '../../../../slices/deviceConnection'
import { preprocessMoreConnection, generateGraphData, preprocessConnection } from '../../../../slices/deviceConnection'
import copy from 'copy-to-clipboard'

export default React.memo(({ deviceId, setCurrentChosenDevice, setCurrentChosenUser }) => {
	const { graphData } = useSelector(deviceConnectionSelector)
	let ref = useRef()

	const handleOnClick = async (e) => {
		if (e.data.type === 'device') {
			copy(e.data.id.trim())
			setCurrentChosenDevice(e.data.id)
		} else if (e.data.type === 'user') {
			copy(e.data.id.trim())
			setCurrentChosenUser(e.data.id)
		}
	}

	const processNewGraphData = (id, connections, sliderChange) => {
		let echartsInstance = ref.current.getEchartsInstance()
		const { data, edges } = echartsInstance.getOption()['series'][0]
		const nodeToExpand = data.find((d) => d.id === id)
		if (!nodeToExpand.expanded || sliderChange) {
			const moreConnection = preprocessMoreConnection(id, connections, data, edges)
			const newGraphData = generateGraphData(moreConnection)
			echartsInstance.setOption(newGraphData)
		}
	}

	const handleDoubleClick = async (e) => {
		if (e.data.type === 'device') {
			const response = await fetch(`http://localhost:8085/api/user_device/device/${e.data.id}/connections`)
			const connections = await response.json()
			processNewGraphData(e.data.id, connections)
		} else if (e.data.type === 'user') {
			const response = await fetch(`http://localhost:8085/api/user_device/user/${e.data.id}/connections`)
			const connections = await response.json()
			processNewGraphData(e.data.id, connections)
		}
	}

	const handleDepthChange = async (depth) => {
		let echartsInstance = ref.current.getEchartsInstance()
		echartsInstance.showLoading()
		const response = await fetch(
			`http://localhost:8085/api/user_device/device_users/${deviceId}/connections/${depth}`
		)
		const connections = await response.json()
		const connection = preprocessConnection(deviceId, connections)
		const graphData = generateGraphData(connection)
		echartsInstance.setOption(graphData)
		echartsInstance.hideLoading()
	}

	return (
		<div className="animated fadeIn">
			<Card
				className="w-full"
				title="Device Depth"
				headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
				hoverable={true}
				extra={<Slider min={2} max={3} onChange={handleDepthChange} style={{ width: '40px' }} />}
			>
				<ReactEcharts
					ref={ref}
					option={graphData}
					style={{ height: '800px', width: '100%' }}
					className="react_for_echarts"
					onEvents={{
						click: handleOnClick,
						dblclick: handleDoubleClick
					}}
				/>
			</Card>
		</div>
	)
})
