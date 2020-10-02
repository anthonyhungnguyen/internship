import { createSlice } from '@reduxjs/toolkit'
import {
	configureSymbolSizeBasedOnDegree,
	generateCategoryFromType,
	generateGraphData,
	generateInTypeFromOutType,
	generateSymbolFromType
} from './util'

export const initialState = {
	loading: true,
	errorInfo: {},
	hasErrors: false,
	user: null,
	graphData: {},
	devices: [],
	cards: [],
	date: {
		lastOnboard: null,
		lastTransaction: null
	},
	filters: {
		range: [ '2020-08-01', '2020-08-31' ]
	}
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		getUser: (state) => {
			state.loading = true
		},
		getUserSuccess: (state, { payload }) => {
			state.user = null
			state.loading = false
			state.hasErrors = false
			state.devices = payload.devices
			state.cards = payload.cards
		},
		getUserFailure: (state, { payload }) => {
			state.errorInfo = payload
			state.loading = false
			state.hasErrors = true
		},
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
		},
		storeLastDate: (state, { payload }) => {
			state.date.lastOnboard = payload.last_device_onboard
			state.date.lastTransaction = payload.last_device_transaction
		},
		storeDateRange: (state, { payload }) => {
			state.filters = { ...state.filters, range: payload }
		}
	}
})

// Three actions from slice
export const {
	storeUserId,
	storeLastDate,
	getUser,
	getUserSuccess,
	getUserFailure,
	storeDateRange,
	getConnection,
	getConnectionSuccess,
	getConnectionFailure
} = userSlice.actions

// Export state selector
export const userSelector = (state) => state.user

// Export default reducer
export default userSlice.reducer

// Asynchronous thunk action
export function fetchUser(id) {
	return async (dispatch) => {
		dispatch(getUser())
		try {
			const response = await fetch('http://localhost:8085/api/profile/test', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					query: `RETURN DOCUMENT(@id)`,
					bindVars: {
						id: `users/${id}`
					}
				})
			})
			const data = await response.json()
			if (data.errorCode) {
				dispatch(getUserFailure(data))
			} else {
				const { devices, cards } = data[0]
				dispatch(getUserSuccess({ devices, cards }))
			}
		} catch (err) {
			dispatch(getUserFailure())
		}
	}
}

export function fetchConnection(id) {
	return async (dispatch) => {
		dispatch(getConnection())
		try {
			const graphDataResponse = await fetch(`http://localhost:8085/api/profile/test`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					query: `FOR v, e IN 1..1 ANY @id GRAPH "test"
							COLLECT source = e._from, target = e._to
							RETURN {source, target}`,
					bindVars: {
						id: `users/${id}`
					}
				})
			})

			const connections = await graphDataResponse.json()
			const formattedConnections = preprocessConnection(`users/${id}`, connections)
			const graphData = generateGraphData(formattedConnections, 'users')
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

export const preprocessConnection = (id, connections) => {
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
