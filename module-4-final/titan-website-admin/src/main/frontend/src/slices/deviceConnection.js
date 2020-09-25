import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
	loading: true,
	errorInfo: {},
	hasErrors: false,
	graphData: {}
}

const deviceConnectionSlice = createSlice({
	name: 'deviceConnection',
	initialState,
	reducers: {
		getConnection: (state) => {
			state.loading = true
		},
		getConnectionSuccess: (state, { payload }) => {
			state.loading = false
			state.hasErrors = false
			state.graphData = payload
		},
		getConnectionFailure: (state, { payload }) => {
			state.loading = false
			state.hasErrors = true
			state.errorInfo = payload
		}
	}
})

// Three actions from slice
export const { getConnection, getConnectionSuccess, getConnectionFailure } = deviceConnectionSlice.actions

// Export state selector
export const deviceConnectionSelector = (state) => state.deviceConnection

// Export default reducer
export default deviceConnectionSlice.reducer

// Asynchronous thunk action

export function fetchConnection(id) {
	return async (dispatch) => {
		dispatch(getConnection())
		try {
			const graphDataResponse = await fetch(`http://localhost:8085/api/user_device/test`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					query: `FOR v, e IN 1..1 ANY @id GRAPH "test"
							COLLECT source = e._from, target = e._to
							RETURN {source, target}`,
					bindVars: {
						id: `devices/${id}`
					}
				})
			})

			const connections = await graphDataResponse.json()

			const formattedConnections = preprocessConnection(id, connections)
			const graphData = generateGraphData(formattedConnections)
			if (connections.errorCode) {
				dispatch(getConnectionFailure(connections))
			} else {
				dispatch(getConnectionSuccess(graphData))
			}
		} catch (err) {
			dispatch(getConnectionFailure())
		}
	}
}

export const preprocessConnection = (deviceId, connections) => {
	let nodes = [
		{
			id: deviceId,
			name: deviceId,
			category: 0,
			type: 'device',
			expanded: true,
			label: {
				fontWeight: 'bold'
			}
		}
	]
	const links = []

	connections.forEach((c) => {
		const user = c['source'].split('/')[1].trim()
		nodes.push({
			id: user,
			name: user,
			category: 1,
			type: 'user',
			expanded: false
		})
		links.push({
			source: deviceId,
			target: user
		})
	})
	return {
		nodes,
		links
	}
}

const generateInTypeFromOutType = (type) => {
	switch (type) {
		case 'devices':
			return 'device'
		case 'users':
			return 'user'
		case 'card_account':
			return 'card_account'
	}
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

export const preprocessMoreConnection = (id, connections, nodes, links, newDepth, idList) => {
	const nodeCount = nodes.map((x) => x.id)
	if (newDepth) {
		idList.forEach((eachId) => {
			const splitId = eachId.split('/')[1]
			const expandedNodeIndex = nodes.findIndex((n) => n.id === splitId)
			nodes[expandedNodeIndex] = {
				...nodes[expandedNodeIndex],
				label: {
					fontWeight: 'bold'
				},
				expanded: true
			}
		})
	} else {
		const expandedNodeIndex = nodes.findIndex((n) => n.id === id)
		nodes[expandedNodeIndex] = {
			...nodes[expandedNodeIndex],
			label: {
				fontWeight: 'bold'
			},
			expanded: true
		}
	}

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
	return {
		nodes,
		links
	}
}

export const generateGraphData = (data) => {
	const connectionsData = {
		type: 'force',
		categories: [
			{
				name: 'Root Device'
			},
			{
				name: 'Users'
			},
			{
				name: 'Related Devices'
			},
			{
				name: 'Related Card'
			}
		],
		nodes: data.nodes,
		links: data.links
	}
	const options = {
		legend: {
			data: [ 'Root Device', 'Users', 'Related Devices', 'Related Card' ]
		},

		series: [
			{
				type: 'graph',
				layout: 'force',
				animation: false,
				// edgeSymbol: [ 'none', 'arrow' ],
				label: {
					normal: {
						show: true,
						position: 'top',
						formatter: '{b}',
						fontSize: 11
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
				data: connectionsData.nodes,
				categories: connectionsData.categories,
				// focusNodeAdjacency: true,
				force: {
					initLayout: 'circular',
					edgeLength: 100,
					repulsion: 1500,
					friction: 0.2
				},
				draggable: true,
				edges: connectionsData.links,
				roam: true,
				symbolSize: 14
			}
		]
	}
	return options
}
