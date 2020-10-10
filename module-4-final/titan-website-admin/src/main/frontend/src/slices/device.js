import { createSlice } from '@reduxjs/toolkit'
import { generateGraphData, configureSymbolSizeBasedOnDegree, generateCategoryFromType } from './util'
import axios from 'axios'
import moment from 'moment'

export const initialState = {
	loading: true,
	errorInfo: {},
	hasErrors: false,
	device: null,
	graphData: {},
	date: {
		dateLoading: true,
		lastOnboard: null,
		lastTransaction: null
	},
	filters: {
		range: [ moment().subtract(1, 'months').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD') ]
	},
	ref: {
		appid: null
	}
}

const deviceSlice = createSlice({
	name: 'device',
	initialState,
	reducers: {
		getDevice: (state) => {
			state.loading = true
		},
		getDeviceSuccess: (state, { payload }) => {
			state.device = payload
			state.loading = false
			state.hasErrors = false
		},
		getDeviceFailure: (state, { payload }) => {
			state.errorInfo = payload
			state.loading = false
			state.hasErrors = true
		},
		storeUserList: (state, { payload }) => {
			state.users = payload
		},
		storeLastDate: (state, { payload }) => {
			state.date.dateLoading = false
			state.date.lastOnboard = payload.last_device_onboard
			state.date.lastTransaction = payload.last_device_transaction
		},
		storeDateRange: (state, { payload }) => {
			state.filters = { ...state.filters, range: payload }
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
		storeAppIdRef: (state, { payload }) => {
			state.ref.appid = payload
		}
	}
})

// Three actions from slice
export const {
	getDevice,
	getDeviceSuccess,
	getDeviceFailure,
	getConnection,
	getConnectionSuccess,
	getConnectionFailure,
	storeUserList,
	storeLastDate,
	storeDateRange,
	storeAppIdRef
} = deviceSlice.actions

// Export state selector
export const deviceSelector = (state) => state.device

// Export default reducer
export default deviceSlice.reducer

// Asynchronous thunk action
export function fetchDevice(id) {
	return async (dispatch) => {
		dispatch(getDevice())
		await axios
			.post('http://localhost:8085/api/profile/info', {
				id: id,
				type: 'devices'
			})
			.then((response) => {
				dispatch(getDeviceSuccess(response.data[0]))
			})
			.catch((err) => {
				dispatch(getDeviceFailure(err))
			})
	}
}

export function fetchConnection(id) {
	return async (dispatch) => {
		dispatch(getConnection())

		axios
			.post('http://localhost:8085/api/profile/depth', {
				idList: [ `devices/${id}` ]
			})
			.then((response) => {
				const formattedConnections = preprocessConnection(`devices/${id}`, response.data)
				const graphData = generateGraphData(formattedConnections, 'devices')
				dispatch(getConnectionSuccess(graphData))
			})
			.catch((err) => {
				dispatch(getConnectionFailure(err))
			})
	}
}

export const preprocessConnection = (id, connections) => {
	const targetType = id.split('/')[0].trim()
	const target = id.split('/')[1].trim()
	let nodes = [
		{
			id: target,
			name: target,
			category: 0,
			type: targetType,
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
		const sourceType = c['source'].split('/')[0].trim()
		const source = c['source'].split('/')[1].trim()
		nodes.push({
			id: source,
			name: source,
			category: generateCategoryFromType(sourceType),
			type: sourceType,
			expanded: false
		})

		links.push({
			source: target,
			target: source
		})
	})
	let newNodes = configureSymbolSizeBasedOnDegree(nodes, links)
	return {
		nodes: newNodes,
		links: links
	}
}
