import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import ReactEcharts from 'echarts-for-react'
import { Card } from 'antd'
import { deviceConnectionSelector } from '../../../../slices/deviceConnection'
import { preprocessMoreConnection, generateGraphData } from '../../../../slices/deviceConnection'

export default React.memo(({ setCurrentChosenDevice, setCurrentChosenUser }) => {
	const { loading, graphData } = useSelector(deviceConnectionSelector)
	let ref = useRef()

	const handleOnClick = async (e) => {
		if (e.data.type === 'device') {
			setCurrentChosenDevice(e.data.id)
		} else if (e.data.type === 'user') {
			setCurrentChosenUser(e.data.id)
		}
	}

	const processNewGraphData = (connections) => {
		let echartsInstance = ref.current.getEchartsInstance()
		const { data, edges } = echartsInstance.getOption()['series'][0]
		const moreConnection = preprocessMoreConnection(connections, data, edges)
		const newGraphData = generateGraphData(moreConnection)
		ref.current.getEchartsInstance().setOption(newGraphData)
	}

	const handleDoubleClick = async (e) => {
		if (e.data.type === 'device') {
			const response = await fetch(`http://localhost:8085/api/user_device/device/${e.data.id}/connections`)
			const connections = await response.json()
			processNewGraphData(connections)
		} else if (e.data.type === 'user') {
			const response = await fetch(`http://localhost:8085/api/user_device/user/${e.data.id}/connections`)
			const connections = await response.json()
			processNewGraphData(connections)
		}
	}
	return (
		<div className="animated fadeIn">
			<Card
				className="w-full"
				title="Device Depth 2-3"
				headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
				hoverable={true}
				loading={loading}
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
