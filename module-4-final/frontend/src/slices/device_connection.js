import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
	loading: true,
	errorInfo: {},
	hasErrors: false,
	connections: [],
	data: {}
}

const deviceConnectionSlice = createSlice({
	name: 'deviceConnection',
	initialState,
	reducers: {
		getConnection: (state) => {
			state.loading = true
		},
		getConnectionSuccess: (state, { payload }) => {
			state.hasErrors = false
			state.connections = payload
		},
		getConnectionFailure: (state, { payload }) => {
			state.loading = false
			state.hasErrors = true
			state.errorInfo = payload
		},
		insertConnectionData: (state, { payload }) => {
			state.data = payload
			state.loading = false
		}
	}
})

// Three actions from slice
export const {
	getConnection,
	getConnectionSuccess,
	getConnectionFailure,
	insertConnectionData
} = deviceConnectionSlice.actions

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
			const payload = await response.json()
			if (payload.errorCode) {
				dispatch(getConnectionFailure(payload))
			} else {
				dispatch(getConnectionSuccess(payload))
			}
		} catch (err) {
			dispatch(getConnectionFailure())
		}
	}
}

export function preprocessConnection(deviceId, connections) {
	return (dispatch) => {
		const nodes = [
			{
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
		dispatch(
			insertConnectionData({
				nodes,
				links
			})
		)
	}
}
