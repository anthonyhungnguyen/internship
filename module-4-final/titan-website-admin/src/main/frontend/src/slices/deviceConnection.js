import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
	loading: true,
	errorInfo: {},
	hasErrors: false,
	connections: [],
	sourceTargetData: {
		nodes: [],
		links: []
	},
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
			state.connections = payload.connections
			state.graphData = payload.graphData
			state.sourceTargetData = payload.formattedConnections
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
			const response = await fetch(`http://localhost:8085/api/user_device/${id}/connections`)
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

export function fetchMoreConnection(id) {
	return async (dispatch, getState) => {
		try {
			const response = await fetch(`http://localhost:8085/api/user_device/${id}/connections`)
			const connections = await response.json()
			const formattedConnections = preprocessMoreConnection(id, connections, getState()['deviceConnection'])
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

export const preprocessConnection = (deviceId, connections) => {
	let nodes = [
		{
			id: deviceId,
			name: deviceId,
			category: 0
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

export const preprocessMoreConnection = (deviceId, connections, oldConnections) => {
	const oldSourceTarget = oldConnections['sourceTargetData']
	let nodes = []
	let nodeCount = []
	let links = [ ...oldSourceTarget.links ]
	if (oldSourceTarget.nodes.length === 0) {
		nodes = [
			{
				id: deviceId,
				name: deviceId,
				category: 0
			}
		]
		nodeCount = [ deviceId.trim() ]
	} else {
		nodes = [ ...oldSourceTarget.nodes ]
		nodeCount = oldSourceTarget.nodes.map((n) => n.id)
	}
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

const generateGraphData = (data) => {
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
		series: [
			{
				type: 'graph',
				layout: 'force',
				animation: true,
				label: {
					normal: {
						show: true,
						position: 'top',
						formatter: '{b}'
					}
				},
				draggable: true,
				data: connectionsData.nodes,
				categories: connectionsData.categories,
				force: {
					edgeLength: 80,
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
