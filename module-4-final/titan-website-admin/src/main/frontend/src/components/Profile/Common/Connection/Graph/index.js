import React, { useRef } from 'react'
import ReactEcharts from 'echarts-for-react'
import { Card, Slider } from 'antd'
import copy from 'copy-to-clipboard'
import { generateGraphData, preprocessMoreConnection } from '../../../../../slices/util'

export default React.memo(({ setCurrentChosenId, setCurrentType, type, graphData }) => {
	// Used for restoring old depth
	let depthData = {}
	depthData[1] = graphData
	let ref = useRef()

	const handleOnClick = async (e) => {
		if (e.data.type === 'devices') {
			copy(e.data.id.trim())
			setCurrentChosenId(e.data.id.trim())
			setCurrentType(e.data.type)
		} else if (e.data.type === 'users') {
			copy(e.data.id.trim())
			setCurrentChosenId(e.data.id.trim())
			setCurrentType(e.data.type)
		} else if (e.data.type === 'card_account') {
			copy(e.data.id.trim())
			setCurrentChosenId(e.data.id.trim())
			setCurrentType(e.data.type)
		}
	}

	const expandOneDepth = async (depth) => {
		let echartsInstance = ref.current.getEchartsInstance()
		const { data, edges } = echartsInstance.getOption()['series'][0]
		if (!depthData[depth]) {
			const unExpandedId = data.filter((x) => !x.expanded).map((x) => `${x.type}/${x.id}`)
			if (unExpandedId.length !== 0) {
				const response = await fetch(`http://localhost:8085/api/user_device/test`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						query: `
						LET idList = @idList
						FOR id in idList
							FOR v, e IN 1..1 ANY id GRAPH "test"
									COLLECT source = e._from, target = e._to
									RETURN {source, target}`,
						bindVars: {
							idList: unExpandedId
						}
					})
				})
				const connections = await response.json()

				const moreConnection = preprocessMoreConnection(connections, data, edges)
				const newGraphData = generateGraphData(moreConnection, type)

				depthData[depth] = newGraphData
				echartsInstance.setOption(newGraphData)
			}
		} else {
			echartsInstance.setOption(depthData[depth])
		}
	}

	const expandOneDepthOnOneNode = async (id) => {
		let echartsInstance = ref.current.getEchartsInstance()
		const { data, edges } = echartsInstance.getOption()['series'][0]
		const checkExpanded = data.find((x) => x.id !== id && !x.expanded)
		if (checkExpanded) {
			const response = await fetch(`http://localhost:8085/api/user_device/test`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					query: `
						LET idList = @idList
						FOR id in idList
							FOR v, e IN 1..1 ANY id GRAPH "test"
									COLLECT source = e._from, target = e._to
									RETURN {source, target}`,
					bindVars: {
						idList: [ id ]
					}
				})
			})
			const connections = await response.json()

			const moreConnection = preprocessMoreConnection(connections, data, edges)
			const newGraphData = generateGraphData(moreConnection, type)

			echartsInstance.setOption(newGraphData)
		}
	}

	const handleDoubleClick = async (e) => {
		expandOneDepthOnOneNode(`${e.data.type}/${e.data.id}`)
	}

	return (
		<div className="animated fadeIn">
			<Card
				className="w-full"
				title="Dive Depth"
				headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
				hoverable={true}
				extra={
					<React.Fragment>
						<Slider min={1} max={10} onChange={expandOneDepth} className="w-40" tooltipVisible />
					</React.Fragment>
				}
			>
				<ReactEcharts
					ref={ref}
					option={graphData}
					lazyUpdate={true}
					style={{ height: '65vh', width: '100%' }}
					renderer="canvas"
					onEvents={{
						click: handleOnClick,
						dblclick: handleDoubleClick
					}}
				/>
			</Card>
		</div>
	)
})
