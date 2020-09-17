import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import ReactEcharts from 'echarts-for-react'
import { Card, Slider } from 'antd'
import { deviceConnectionSelector } from '../../../../slices/deviceConnection'
import { preprocessMoreConnection, generateGraphData, preprocessConnection } from '../../../../slices/deviceConnection'
import copy from 'copy-to-clipboard'

// Used for restoring old depth
const depthData = {}

export default React.memo(({ setCurrentChosenDevice, setCurrentChosenUser }) => {
	const { graphData } = useSelector(deviceConnectionSelector)
	depthData[2] = graphData
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

	const processNewGraphData = (id, connections) => {
		let echartsInstance = ref.current.getEchartsInstance()
		const { data, edges } = echartsInstance.getOption()['series'][0]
		const nodeToExpand = data.find((d) => d.id === id)
		if (!nodeToExpand.expanded) {
			const moreConnection = preprocessMoreConnection(id, connections, data, edges, false, null)
			const newGraphData = generateGraphData(moreConnection)
			echartsInstance.setOption(newGraphData)
		}
	}

	const expandOneDepth = async (depth) => {
		let echartsInstance = ref.current.getEchartsInstance()
		const { data, edges } = echartsInstance.getOption()['series'][0]
		if (!depthData[depth]) {
			const unExpandedId = data
				.filter((x) => !x.expanded)
				.map((x) => (x.type === 'device' ? 'devices/' + x.id : 'users/' + x.id))
			if (unExpandedId.length !== 0) {
				const response = await fetch(`http://localhost:8085/api/user_device/device_users/moreDepth`, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					method: 'POST',
					body: JSON.stringify(unExpandedId)
				})
				const connections = await response.json()

				const moreConnection = preprocessMoreConnection(null, connections, data, edges, true, unExpandedId)
				const newGraphData = generateGraphData(moreConnection)

				depthData[depth] = newGraphData
				echartsInstance.setOption(newGraphData)
			}
		} else {
			echartsInstance.setOption(depthData[depth])
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

	return (
		<div className="animated fadeIn">
			<Card
				className="w-full"
				title="Device Depth"
				headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
				hoverable={true}
				extra={
					<React.Fragment>
						<Slider min={2} max={10} onChange={expandOneDepth} className="w-40" tooltipVisible />
					</React.Fragment>
				}
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
