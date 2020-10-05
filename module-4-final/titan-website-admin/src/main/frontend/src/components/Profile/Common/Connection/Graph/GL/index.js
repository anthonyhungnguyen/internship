import React, { useEffect, useRef, useState, useReducer } from 'react'
import axios from 'axios'
import 'echarts'
import 'echarts-gl'
import { Card, Slider } from 'antd'
import ReactEcharts from 'echarts-for-react'
import copy from 'copy-to-clipboard'

export default React.memo(({ setCurrentChosenId, setCurrentType, id, type }) => {
	const [ graphData, setGraphData ] = useState(null)
	const ref = useRef(null)

	useEffect(() => {
		axios
			.post('http://localhost:8085/api/profile/depth', {
				idList: [ `devices/${id}` ]
			})
			.then((response) => {
				const formattedConnections = preprocessDeviceConnection(`devices/${id}`, response.data)
				const graphData = generateGraphData(formattedConnections, 'devices')
				setGraphData(graphData)
			})
			.catch(console.error)
	}, [])

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

	const preprocessUserConnection = (id, connections) => {
		const sourceType = id.split('/')[0].trim()
		const source = id.split('/')[1].trim()
		let nodes = [
			{
				id: source,
				name: source,
				category: 0,
				type: sourceType,
				expanded: true,
				label: {
					fontWeight: 'bold'
				},
				symbolSize: connections.length,
				value: connections.length
			}
		]
		const links = []

		connections.forEach((c) => {
			const type = c['target'].split('/')[0].trim()
			const target = c['target'].split('/')[1].trim()
			nodes.push({
				id: target,
				name: target,
				category: generateCategoryFromType(type),
				type: type,
				expanded: false
			})

			links.push({
				source: source,
				target: target
			})
		})
		let newNodes = configureSymbolSizeBasedOnDegree(nodes, links)
		return {
			nodes: newNodes,
			links: links
		}
	}

	const preprocessDeviceConnection = (id, connections) => {
		const targetType = id.split('/')[0].trim()
		const target = id.split('/')[1].trim()
		let nodes = [
			{
				id: target,
				name: target,
				category: 0,
				type: targetType,
				expanded: true,
				label: {
					fontWeight: 'bold'
				},
				symbolSize: connections.length,
				value: connections.length
			}
		]
		const links = []

		connections.forEach((c) => {
			const sourceType = c['source'].split('/')[0].trim()
			const source = c['source'].split('/')[1].trim()
			nodes.push({
				id: source,
				name: source,
				category: 1,
				type: sourceType,
				expanded: false
			})

			links.push({
				source: target,
				target: source
			})
		})
		return {
			nodes: nodes,
			links: links
		}
	}

	const expandOneDepth = async (depth) => {
		let echartsInstance = ref.current.getEchartsInstance()
		const { data, edges } = echartsInstance.getOption()['series'][0]
		const unExpandedId = data.filter((x) => !x.expanded).map((x) => `${x.type}/${x.id}`)
		if (unExpandedId.length !== 0) {
			axios
				.post('http://localhost:8085/api/profile/depth', {
					idList: unExpandedId
				})
				.then((response) => {
					const moreConnection = preprocessMoreConnection(response.data, data, edges)
					const newGraphData = generateGraphData(moreConnection, 'devices')
					setGraphData(newGraphData)
				})
				.catch(console.error)
		}
	}

	const generateGraphData = (data, type) => {
		const categoriesAndLegends = generateCategoriesAndLegendsFromRoot('users')
		const options = {
			legend: {
				data: [ 'Root Users', 'Related Devices', 'Related Users', 'Related Cards' ]
			},
			// itemStyle: {
			// 	borderColor: '#fff',
			// 	borderWidth: 1,
			// 	shadowBlur: 5,
			// 	shadowColor: 'rgba(0, 0, 0, 0.1)'
			// },
			// lineStyle: {
			// 	color: 'source',
			// 	curveness: 0.1,
			// 	width: 0.5
			// },
			tooltip: {},
			zoom: 1,

			series: [
				{
					type: 'graphGL',
					data: data.nodes,
					edges: data.links,
					categories: categoriesAndLegends,
					forceAtlas2: {
						steps: 9,
						barnesHutOptimize: true
					}
				}
			]
		}
		return options
	}
	const preprocessMoreConnection = (connections, nodes, links) => {
		const nodeCount = nodes.map((x) => x.id)
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
					type: fromType,
					expanded: false
				})
				nodeCount.push(from)
			}
			if (nodeCount.indexOf(to) < 0) {
				nodes.push({
					id: to,
					name: to,
					category: generateCategoryFromType(toType),
					type: toType,
					expanded: false
				})
				nodeCount.push(to)
			}
			if (!links.find((x) => (x.source === from && x.target === to) || (x.source === to && x.target === from))) {
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

	const generateCategoriesAndLegendsFromRoot = (type) => {
		const users = generateSymbolFromType('users')
		const devices = generateSymbolFromType('devices')
		const cards = generateSymbolFromType('card_account')
		const rootUser = generateSymbolFromType('rootUser')
		const rootDevice = generateSymbolFromType('rootDevice')
		let defaultType = [
			{
				name: 'Related Users',
				symbol: users,
				icon: users
			},
			{
				name: 'Related Devices',
				symbol: devices,
				icon: devices
			},
			{
				name: 'Related Card',
				symbol: cards,
				icon: cards
			}
		]
		if (type === 'users') {
			defaultType = [
				{
					name: 'Root User',
					symbol: rootUser,
					icon: rootUser
				},
				...defaultType
			]
		} else if (type === 'devices') {
			defaultType = [
				{
					name: 'Root Device',
					symbol: rootDevice,
					icon: rootDevice
				},
				...defaultType
			]
		}
		return defaultType
	}

	const generateCategoryFromType = (type) => {
		switch (type) {
			case 'devices':
				return 2
			case 'users':
				return 1
			case 'card_account':
				return 3
		}
	}

	const generateSymbolFromType = (type) => {
		switch (type) {
			case 'rootDevice':
				return `circle`
			case 'rootUser':
				return `rect`
			case 'devices':
				return `roundRect`
			case 'users':
				return `triangle`
			case 'card_account':
				return `diamond`
		}
	}

	const configureSymbolSizeBasedOnDegree = (nodes, links) => {
		const newNodes = []
		nodes.forEach((n) => {
			let outDegreeCount = 0
			let inDegreeCount = 0
			links.forEach((l) => {
				if (l.source === n.id) {
					outDegreeCount += 1
				} else if (l.target === n.id) {
					inDegreeCount += 1
				}
			})
			const totalDegree = inDegreeCount + outDegreeCount
			const symbolSize = totalDegree
			newNodes.push({ ...n, symbolSize: symbolSize + 10, value: symbolSize })
		})
		return newNodes
	}

	const expandOneDepthOnOneNode = async (id) => {
		let echartsInstance = ref.current.getEchartsInstance()
		const { data, edges } = echartsInstance.getOption()['series'][0]
		const checkExpanded = data.find((x) => x.id !== id && !x.expanded)
		if (checkExpanded) {
			axios
				.post('http://localhost:8085/api/profile/depth', {
					idList: [ id ]
				})
				.then((response) => {
					const moreConnection = preprocessMoreConnection(response.data, data, edges)
					const newGraphData = generateGraphData(moreConnection, type)
					echartsInstance.setOption(newGraphData)
				})
				.catch(console.error)
		}
	}

	const handleDoubleClick = async (e) => {
		expandOneDepthOnOneNode(`${e.data.type}/${e.data.id}`)
	}

	return (
		graphData && (
			<Card
				className="h-full w-full"
				title="Dive Depth"
				headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
				hoverable={true}
				extra={
					<React.Fragment>
						<button
							onClick={() => {
								ref.current.rerender()
							}}
						>
							Click me
						</button>
						<Slider min={1} max={10} onChange={expandOneDepth} className="w-40" tooltipVisible />
					</React.Fragment>
				}
			>
				<ReactEcharts
					ref={ref}
					option={graphData}
					style={{ height: '65vh', width: '100%' }}
					onEvents={{
						click: handleOnClick,
						dblclick: handleDoubleClick
					}}
				/>
			</Card>
		)
	)
})
