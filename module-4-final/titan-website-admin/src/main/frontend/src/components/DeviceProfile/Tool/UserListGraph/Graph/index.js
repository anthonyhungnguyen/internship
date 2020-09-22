import React, { useEffect, useState } from 'react'
import { Card, Skeleton } from 'antd'
import ReactEchartsCore from 'echarts-for-react'
import echarts from 'echarts/lib/echarts'
import { node } from 'prop-types'

export default ({ userList }) => {
	const [ graphData, setGraphData ] = useState(null)

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
							FOR v, e IN 1..1 ANY u users_devices
								COLLECT source = e._from, target = e._to, type = e.type
								RETURN {source, target, type}`,
						bindVars: {
							userList: userList.map((x) => 'users/' + x)
						}
					})
				})

				const data = await response.json()
				const preConnections = preprocessConnection(userList, data)
				const graphData = getGraphData(preConnections)
				setGraphData(graphData)
			}
			const preprocessConnection = (userList, connections) => {
				let nodes = userList.map((u) => ({
					id: u,
					name: u,
					category: 0,
					type: 'user',
					expanded: false
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
							expanded: false
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

			fetchConnections()
		},
		[ userList ]
	)

	return (
		<Card className="mt-2" headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }} hoverable={true}>
			{graphData ? (
				<ReactEchartsCore
					echarts={echarts}
					option={graphData}
					style={{ height: '600px', width: '100%' }}
					className="react_for_echarts"
				/>
			) : (
				<Skeleton active />
			)}
		</Card>
	)
}
