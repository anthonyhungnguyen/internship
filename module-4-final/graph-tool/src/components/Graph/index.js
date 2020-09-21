import React, { useEffect, useState } from 'react'
import ReactEcharts from 'echarts-for-react'
import { useDispatch, useSelector } from 'react-redux'
import { dataSelector } from '../../slices/graph'
import { storeGraphData } from '../../slices/graph'

export default () => {
	const dispatch = useDispatch()
	const { graph, id, options } = useSelector(dataSelector)
	const { idType, edgeType } = options

	useEffect(
		() => {
			const fetchData = async () => {
				const response = await fetch('http://localhost:8085/api/user_device/test/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						query: 'FOR v, e IN @fromDepth..@toDepth %s @id @@col %s %s LIMIT @limit RETURN %s',
						bindVars: {
							'@col': 'users_devices',
							fromDepth: 1,
							toDepth: 1,
							id: `${idType}/${id}`,
							limit: null
						},
						options: {
							direction: 'ANY',
							filter: edgeType !== 'all' ? `FILTER e.type == '${edgeType}'` : '',
							collect: 'COLLECT source = e._from, target = e._to',
							return: '{source, target}'
						}
					})
				})
				const data = await response.json()
				const connections = buildConnections(data)
				const graph = buildGraph(connections)

				dispatch(storeGraphData(graph))
			}

			const buildConnections = (data) => {
				const nodeTrack = [ id.trim() ]
				const nodes = [
					{
						id: id,
						name: id,
						category: 0,
						type: idType,
						expanded: true
					}
				]

				const links = data.map((x) => ({
					source: x.source.split('/')[1].trim(),
					target: x.target.split('/')[1].trim()
				}))

				links.forEach((x) => {
					if (!nodeTrack.includes(x.source.trim())) {
						nodes.push({
							id: x.source,
							name: x.source,
							category: 1,
							type: 'user',
							expanded: false
						})
						nodeTrack.push(x.source.trim())
					}
					if (!nodeTrack.includes(x.target.trim())) {
						nodes.push({
							id: x.target,
							name: x.target,
							category: 2,
							type: 'device',
							expanded: false
						})
						nodeTrack.push(x.target.trim())
					}
				})
				return {
					nodes,
					links
				}
			}

			const buildGraph = (data) => {
				const connectionsData = {
					type: 'force',
					categories: [
						{
							name: 'Root'
						},
						{
							name: 'Users'
						},
						{
							name: 'Devices'
						}
					],
					nodes: data.nodes,
					links: data.links
				}
				return {
					legend: {
						data: [ 'Root Device', 'Users', 'Related Devices' ]
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
								color: 'source',
								curveness: 0.1
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
			}

			fetchData()
		},
		[ id, dispatch, edgeType ]
	)

	return graph ? <ReactEcharts option={graph} style={{ height: '100%', width: '100%' }} /> : null
}
