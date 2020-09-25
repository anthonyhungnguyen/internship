import React, { useEffect, useRef, useState } from 'react'
import { Card, Skeleton, Slider } from 'antd'
import ReactEchartsCore from 'echarts-for-react'
import echarts from 'echarts/lib/echarts'
import { preprocessMoreConnection } from '../../../../../../slices/deviceConnection'

export default ({ userList }) => {
	const [ connections, setConnections ] = useState(null)
	const [ graphData, setGraphData ] = useState(null)
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
							FOR v, e IN 1..1 ANY u user_device_onboard
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
				const graphData = getGraphData(preConnections)
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
		const nodeCount = []
		connections.forEach((c) => {
			const user = c['source'].split('/')[1].trim()
			const device = c['target'].split('/')[1].trim()
			if (!nodeCount.includes(device)) {
				nodes.push({
					id: device,
					name: device,
					category: 1,
					type: 'device',
					expanded: false,
					label: {
						show: false
					}
				})
				nodeCount.push(device)
			}
			links.push({
				source: user,
				target: device,
				lineStyle: {
					color: edgeColor(c.type)
				}
			})
		})
		return {
			nodes,
			links
		}
	}

	const getGraphData = (data) => {
		const connectionsData = {
			type: 'force',
			categories: [
				{
					name: 'Root Users'
				},
				{
					name: 'Devices'
				}
			],
			nodes: data.nodes,
			links: data.links
		}
		const options = {
			legend: {
				data: [ 'Root User', 'Devices' ]
			},
			animationDurationUpdate: 3000,
			animationEasingUpdate: 'quinticInOut',
			series: [
				{
					type: 'graph',
					layout: 'force',
					animation: true,
					// edgeSymbol: [ 'none', 'arrow' ],
					animationEasing: 'elasticIn',
					label: {
						normal: {
							show: true,
							position: 'top',
							formatter: '{b}'
						}
					},
					itemStyle: {
						borderColor: '#fff',
						borderWidth: 1,
						shadowBlur: 5,
						shadowColor: 'rgba(0, 0, 0, 0.1)'
					},
					lineStyle: {
						curveness: 0.1,
						width: 2
					},
					emphasis: {
						lineStyle: {
							width: 5
						}
					},
					draggable: true,
					data: connectionsData.nodes,
					categories: connectionsData.categories,
					force: {
						edgeLength: 90,
						repulsion: 700,
						friction: 0.3
					},
					edges: connectionsData.links,
					roam: true,
					symbolSize: 16
				}
			]
		}
		return options
	}

	const expandedOneDepth = async () => {
		let echartsInstance = ref.current.getEchartsInstance()
		const { data, edges } = echartsInstance.getOption()['series'][0]
		const unexpanded = connections['nodes'].filter((x) => !x.expanded).map((x) => x.type + 's/' + x.id)
		const response = await fetch('http://localhost:8085/api/user_device/test', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query: `LET idList = @idList

						FOR u IN idList
							FOR v, e IN 1..1 ANY u users_devices
								COLLECT source = e._from, target = e._to, type = e.type
								RETURN {source, target, type}`,
				bindVars: {
					idList: unexpanded.map((x) => x)
				}
			})
		})
		const responseData = await response.json()
		const moreConnection = preprocessMoreConnection(null, responseData, data, edges, true, unexpanded)
		console.log(moreConnection)
		const newGraphData = getGraphData(moreConnection)
		echartsInstance.setOption(newGraphData)
	}

	return (
		<Card className="mt-2" headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }} hoverable={true}>
			<Slider min={1} max={10} onChange={expandedOneDepth} className="w-40" tooltipVisible />
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
