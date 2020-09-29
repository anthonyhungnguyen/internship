import React, { useEffect, useRef, useState } from 'react'
import { Card, Skeleton, Slider } from 'antd'
import ReactEchartsCore from 'echarts-for-react'
import echarts from 'echarts/lib/echarts'
import {
	configureSymbolSizeBasedOnDegree,
	generateCategoryFromType,
	generateGraphData,
	generateInTypeFromOutType,
	generateSymbolFromType,
	preprocessMoreConnection
} from '../../../../../../slices/util'

export default ({ userList }) => {
	const [ connections, setConnections ] = useState(null)
	const [ graphData, setGraphData ] = useState(null)

	let depthData = {}
	depthData[1] = graphData

	let ref = useRef()

	const edgeColor = (type) => {
		switch (type) {
			case 'user_use_device':
				return '#f1c40f'
			case 'transaction':
				return '#3498db'
		}
	}

	useEffect(
		() => {
			const fetchConnections = async () => {
				const response = await fetch('http://localhost:8085/api/user_device/test', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						query: `LET userList = @userList

						FOR u IN userList
							FOR v, e IN 1..1 ANY u GRAPH "test"
								COLLECT source = e._from, target = e._to, type = e.type
								RETURN {source, target, type}`,
						bindVars: {
							userList: userList.map((x) => 'users/' + x)
						}
					})
				})

				const data = await response.json()
				const preConnections = preprocessConnection(userList, data)
				setConnections(preConnections)
				const graphData = generateGraphData(preConnections, 'user')
				setGraphData(graphData)
			}

			fetchConnections()
		},
		[ userList ]
	)

	const preprocessConnection = (idList, connections) => {
		let nodes = idList.map((u) => ({
			id: u,
			name: u,
			category: 0,
			type: 'user',
			expanded: true
		}))
		const links = []
		const nodeCount = [ ...idList ]
		connections.forEach((c) => {
			const fromType = c['source'].split('/')[0]
			const toType = c['target'].split('/')[0]
			const from = c['source'].split('/')[1].trim()
			const to = c['target'].split('/')[1].trim()
			if (nodeCount.indexOf(from) < 0) {
				nodes.push({
					id: from,
					name: from,
					category: generateCategoryFromType(fromType),
					type: generateInTypeFromOutType(fromType),
					expanded: false
				})
				nodeCount.push(from)
			}
			if (nodeCount.indexOf(to) < 0) {
				nodes.push({
					id: to,
					name: to,
					category: generateCategoryFromType(toType),
					type: generateInTypeFromOutType(toType),
					expanded: false
				})
				nodeCount.push(to)
			}
			if (!links.find((x) => x.source === from && x.target === to)) {
				links.push({
					source: to,
					target: from
				})
			}
		})
		let newNodes = configureSymbolSizeBasedOnDegree(nodes, links)
		return {
			nodes: newNodes,
			links: links
		}
	}
	const generateUnexpandedId = (item) => {
		switch (item.type) {
			case 'device':
				return 'devices/' + item.id
			case 'user':
				return 'users/' + item.id
			case 'card_account':
				return 'card_account/' + item.id
		}
	}

	const expandOneDepth = async (depth) => {
		let echartsInstance = ref.current.getEchartsInstance()
		const { data, edges } = echartsInstance.getOption()['series'][0]
		if (!depthData[depth]) {
			const unExpandedId = data.filter((x) => !x.expanded).map((x) => generateUnexpandedId(x))
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
				const newGraphData = generateGraphData(moreConnection, 'user')

				echartsInstance.setOption(newGraphData)
			}
		} else {
			echartsInstance.setOption(depthData[depth])
		}
	}

	return (
		<Card className="mt-2" headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }} hoverable={true}>
			<Slider min={1} max={10} onChange={expandOneDepth} className="w-40" tooltipVisible />
			{graphData ? (
				<ReactEchartsCore
					ref={ref}
					echarts={echarts}
					option={graphData}
					style={{ height: '500px', width: '100%' }}
				/>
			) : (
				<Skeleton active />
			)}
		</Card>
	)
}
