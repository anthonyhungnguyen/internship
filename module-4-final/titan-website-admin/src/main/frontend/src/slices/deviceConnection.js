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
			state.graphData = payload.graphData
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
			const response = await fetch(`http://localhost:8085/api/user_device/device/${id}/connections`)
			const connections = await response.json()
			const formattedConnections = preprocessConnection(id, connections)
			const graphData = generateGraphData(formattedConnections)
			if (connections.errorCode) {
				dispatch(getConnectionFailure(connections))
			} else {
				dispatch(getConnectionSuccess({ connections, formattedConnections, graphData }))
			}
		} catch (err) {
			dispatch(getConnectionFailure())
		}
	}
}

const preprocessConnection = (deviceId, connections) => {
	let nodes = [
		{
			id: deviceId,
			name: deviceId,
			category: 0,
			type: 'device'
		}
	]
	const links = []
	const nodeCount = [ deviceId.trim() ]

	connections.forEach((c) => {
		const user = c['from'].split('/')[1].trim()
		const device = c['to'].split('/')[1].trim()
		if (nodeCount.indexOf(device) < 0) {
			nodes.push({
				id: device,
				name: device,
				category: 2,
				type: 'device'
			})
			nodeCount.push(device)
		}
		if (nodeCount.indexOf(user) < 0) {
			nodes.push({
				id: user,
				name: user,
				category: 1,
				type: 'user'
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

export const preprocessMoreConnection = (connections, nodes, links) => {
	const nodeCount = nodes.map((x) => x.id)

	connections.forEach((c) => {
		const user = c['from'].split('/')[1].trim()
		const device = c['to'].split('/')[1].trim()
		if (nodeCount.indexOf(device) < 0) {
			nodes.push({
				id: device,
				name: device,
				category: 3,
				type: 'device'
			})
			nodeCount.push(device)
		}
		if (nodeCount.indexOf(user) < 0) {
			nodes.push({
				id: user,
				name: user,
				category: 1,
				type: 'user'
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
					edgeLength: 70,
					repulsion: 600,
					friction: 0.3
				},
				edges: connectionsData.links,
				roam: true,
				symbolSize: 15
			}
		]
	}
	return options
}
