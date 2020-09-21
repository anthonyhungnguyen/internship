import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

export const initialState = {
	loading: true,
	errorInfo: {},
	hasErrors: false,
	graph: null,
	id: '0CA30A94-6251-4727-8340-9B6BE942AACB',
	options: {
		idType: 'devices',
		edgeType: 'all'
	}
}

const graphSlice = createSlice({
	name: 'graph',
	initialState,
	reducers: {
		storeId: (state, { payload }) => {
			state.id = payload
		},
		storeIdType: (state, { payload }) => {
			state.options = { ...state.options, idType: payload }
		},
		storeEdgeType: (state, { payload }) => {
			state.options = { ...state.options, edgeType: payload }
		},
		storeGraphData: (state, { payload }) => {
			state.graph = payload
		},
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
		}
	}
})

// Three actions from slice
export const {
	storeId,
	storeIdType,
	storeEdgeType,
	storeGraphData,
	addFilter,
	removeFilter,
	getData,
	getDataSuccess,
	getDataFailure
} = graphSlice.actions

// Export state selector
export const dataSelector = (state) => state.graph

// Export default reducer
export default graphSlice.reducer

// Asynchronous thunk action
export function fetchData(id) {
	return async (dispatch) => {
		dispatch(getData())
		try {
			const response = await fetch(`http://localhost:8085/api/device/${id}`)
			const payload = await response.json()
			if (payload.errorCode) {
				dispatch(getDataFailure(payload))
			} else {
				dispatch(getDataSuccess(payload))
			}
		} catch (err) {
			dispatch(getDataFailure())
		}
	}
}
