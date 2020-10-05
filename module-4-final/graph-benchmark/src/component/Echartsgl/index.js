import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import ReactEcharts from 'echarts-for-react'
import copy from 'copy-to-clipboard'
import 'echarts-gl'
import 'echarts'

let expandTime = 0
let count = 1
let expandLength = 0

export default () => {
	const [ graphData, setGraphData ] = useState(null)
	const ref = useRef(null)
	useEffect(() => {
		axios
			.post('http://localhost:8085/api/profile/graph0', {
				type: 'graph0_user',
				id: '191129565003782',
				depth: 1
			})
			.then((response) => {
				const nodesProcessed = processNodes(response.data)
				const linksProcessed = processLinks(response.data)
				// let { nodes, links } = adjustSymbolSize(nodesProcessed, linksProcessed)
				setGraphData(getGraphOption(nodesProcessed, linksProcessed))
			})
			.catch(console.error)
	}, [])

	const processNodes = (data) => {
		const nodeTrack = [ '191129565003782' ]
		const nodes = [
			{
				id: '191129565003782',
				group: 0,
				expanded: true,
				type: 'graph0_user'
			}
		]
		data.forEach((d) => {
			const fromType = d._from.split('/')[0]
			const fromId = d._from.split('/')[1]
			const toType = d._to.split('/')[0]
			const toId = d._to.split('/')[1]
			if (!nodeTrack.includes(fromId)) {
				nodeTrack.push(fromId)
				nodes.push(checkType(fromId, fromType))
			}
			if (!nodeTrack.includes(toId)) {
				nodeTrack.push(toId)
				nodes.push(checkType(toId, toType))
			}
		})
		return nodes
	}

	const processLinks = (data) => {
		const links = []
		data.forEach((d) => {
			const fromId = d._from.split('/')[1]
			const toId = d._to.split('/')[1]
			links.push({
				source: fromId,
				target: toId
			})
		})
		return [ ...new Set(links.map(JSON.stringify)) ].map(JSON.parse)
	}

	const adjustSymbolSize = (nodes, links) => {
		let newNodes = []
		nodes.forEach((n) => {
			if (n.expanded) {
				const inDegree = links.filter((l) => l.target === n.id).length
				const outDegree = links.filter((l) => l.source === n.id).length
				newNodes.push({ ...n, symbolSize: Math.log2(inDegree + outDegree) })
			} else {
				newNodes.push({ ...n })
			}
		})
		return { nodes: newNodes, links: links }
	}

	const checkType = (id, type) => {
		switch (type) {
			case 'graph0_user':
				return {
					name: id,
					id: id,
					category: 0,
					type: type,
					expanded: false
				}
			case 'graph0_card':
				return {
					name: id,
					id: id,
					category: 1,
					type: type,
					expanded: false
				}
			case 'graph0_account':
				return {
					name: id,
					id: id,
					category: 2,
					type: type,
					expanded: false
				}
			case 'graph0_device':
				return {
					name: id,
					id: id,
					category: 3,
					type: type,
					expanded: false
				}
		}
	}

	const getGraphOption = (nodes, links) => {
		return {
			series: [
				{
					type: 'graphGL',
					symbol: 'circle',
					nodes: nodes,
					links: links,
					forceAtlas2: {
						step: 10000,
						gravity: 100,
						barnesHutOptimize: true
					},
					focusNodeAdjacency: false,
					animation: false,
					categories: [
						{
							name: 'user'
						},
						{
							name: 'card'
						},
						{
							name: 'account'
						},
						{
							name: 'device'
						}
					]
				}
			]
		}
	}

	const expandDepth = () => {
		let t0 = performance.now()
		const { nodes, links } = graphData.series[0]
		const needToExpand = nodes.filter((n) => !n.expanded).map((n) => `${n.type}/${n.id}`)
		axios
			.post(`http://localhost:8085/api/profile/graph0/moreDepth`, {
				idList: needToExpand
			})
			.then((response) => {
				let { nodes, links } = processMore(response.data)

				let t1 = performance.now()

				count += 1
				expandLength = needToExpand.length
				expandTime = ((t1 - t0) / 1000).toPrecision(3)
				setGraphData(getGraphOption(nodes, links))
				// echartInstance.setOption({ series: { nodes: nodes, links: links } })
			})
			.catch(console.error)
	}

	const processMore = (data) => {
		const echartInstance = ref.current.getEchartsInstance()
		const { nodes, links } = echartInstance.getOption().series[0]
		const nodeTrack = nodes.map((n) => n.id)
		const newNodes = nodes.map((n) => ({ ...n, expanded: true }))
		const newLinks = [ ...links ]

		data.forEach((d) => {
			const fromType = d.source.split('/')[0]
			const fromId = d.source.split('/')[1]
			const toType = d.target.split('/')[0]
			const toId = d.target.split('/')[1]
			if (nodeTrack.indexOf(fromId) < 0) {
				nodeTrack.push(fromId)
				newNodes.push(checkType(fromId, fromType))
			}
			if (nodeTrack.indexOf(toId) < 0) {
				nodeTrack.push(toId)
				newNodes.push(checkType(toId, toType))
			}
			newLinks.push({
				source: fromId,
				target: toId
			})
		})

		return { nodes: newNodes, links: [ ...new Set(newLinks.map(JSON.stringify)) ].map(JSON.parse) }
	}

	if (graphData) {
		console.log(graphData)
		console.log('Depth: ', count)
		console.log('Expand: ', expandLength)
		console.log('Nodes: ', graphData.series[0].nodes.length)
		console.log('Edges: ', graphData.series[0].links.length)
		console.log('Took: ', expandTime)
		console.log(graphData.series[0].nodes, graphData.series[0].links)
	}
	return (
		graphData && (
			<div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
				<button onClick={expandDepth}>+</button>
				<ReactEcharts
					ref={ref}
					option={graphData}
					style={{ height: window.innerHeight, width: window.innerWidth }}
					onEvents={{
						click: (e) => {
							copy(e.data.id)
						}
					}}
				/>
			</div>
		)
	)
}
