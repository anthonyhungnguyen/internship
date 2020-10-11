import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import moment from 'moment'
import { configureSymbolSizeBasedOnDegree, generateCategoryFromType, generateGraphData } from './util'

export const initialState = {
	loading: false,
	errorInfo: {},
	hasErrors: false,
	graphData: {},
	devices: [],
	cards: [],
	filters: {
		range: [ moment().subtract(1, 'months').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD') ]
	}
}

const userSlice = createSlice({
	name: 'user',
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

export function fetchConnection(id) {
	return async (dispatch) => {
		dispatch(getConnection())
		axios
			.post('http://localhost:8085/api/profile/depth', {
				idList: [ `users/${id}` ]
			})
			.then((response) => {
				const formattedConnections = preprocessConnection(`users/${id}`, response.data)
				const graphData = generateGraphData(formattedConnections, 'users')
				dispatch(getConnectionSuccess(graphData))
			})
			.catch((err) => {
				dispatch(getConnectionFailure(err))
			})
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
