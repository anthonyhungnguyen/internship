import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import ReactEcharts from 'echarts-for-react'
import { Card } from 'antd'
import { deviceConnectionSelector } from '../../../../slices/deviceConnection'
import { preprocessMoreConnection, generateGraphData } from '../../../../slices/deviceConnection'
import copy from 'copy-to-clipboard'

export default React.memo(({ setCurrentChosenDevice, setCurrentChosenUser }) => {
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

	const processNewGraphData = (deviceId, connections) => {
		let echartsInstance = ref.current.getEchartsInstance()
		const { data, edges } = echartsInstance.getOption()['series'][0]
		const moreConnection = preprocessMoreConnection(deviceId, connections, data, edges)
		const newGraphData = generateGraphData(moreConnection)
		ref.current.getEchartsInstance().setOption(newGraphData)
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
	return (
		<div className="animated fadeIn">
			<Card
				className="w-full"
				title="Device Depth"
				headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
				hoverable={true}
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
