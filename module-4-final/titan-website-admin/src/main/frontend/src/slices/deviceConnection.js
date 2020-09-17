import { createSlice } from '@reduxjs/toolkit'
import { isEmptyBindingElement } from 'typescript'

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

export function fetchConnection(id, depth) {
	return async (dispatch) => {
		dispatch(getConnection())
		try {
			const response = await fetch(
				`http://localhost:8085/api/user_device/device_users/${id}/connections/${depth}`
			)
			const connections = await response.json()
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
			name: `${deviceId} (expanded)`,
			category: 0,
			type: 'device',
			expanded: true
		}
	]
	const links = []
	const nodeCount = [ deviceId.trim() ]

	connections.forEach(async (c) => {
		const user = c['source'].split('/')[1].trim()
		const device = c['target'].split('/')[1].trim()
		if (nodeCount.indexOf(device) < 0) {
			nodes.push({
				id: device,
				name: device,
				category: 2,
				type: 'device',
				expanded: false
			})
			nodeCount.push(device)
		}
		if (nodeCount.indexOf(user) < 0) {
			nodes.push({
				id: user,
				name: user,
				category: 1,
				type: 'user',
				expanded: true
			})
			nodeCount.push(user)
		}
		links.push({
			source: device,
			target: user
		})
	})
	return {
		nodes,
		links
	}
}

export const preprocessMoreConnection = (id, connections, nodes, links) => {
	const nodeCount = nodes.map((x) => x.id)

	const expandedNodeIndex = nodes.findIndex((n) => n.id === id)
	nodes[expandedNodeIndex] = {
		...nodes[expandedNodeIndex],
		name: nodes[expandedNodeIndex]['name'] + ' (expanded) ',
		expanded: true
	}

	connections.forEach((c) => {
		const user = c['source'].split('/')[1].trim()
		const device = c['target'].split('/')[1].trim()
		if (nodeCount.indexOf(device) < 0) {
			nodes.push({
				id: device,
				name: device,
				category: 2,
				type: 'device',
				expanded: false
			})
			nodeCount.push(device)
		}
		if (nodeCount.indexOf(user) < 0) {
			nodes.push({
				id: user,
				name: user,
				category: 1,
				type: 'user',
				expanded: false
			})
			nodeCount.push(user)
		}
		links.push({
			source: device,
			target: user
		})
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
			}
		],
		nodes: data.nodes,
		links: data.links
	}
	const options = {
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
					repulsion: 600,
					friction: 0.2
				},
				edges: connectionsData.links,
				roam: true,
				symbolSize: 16
			}
		]
	}
	return options
}
