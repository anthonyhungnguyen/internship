import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'

export const initialState = {
	loading: true,
	errorInfo: {},
	hasErrors: false,
	timestamps: [],
	formattedTimestamps: []
}

const deviceActivitySlice = createSlice({
	name: 'deviceActivity',
	initialState,
	reducers: {
		getActivity: (state) => {
			state.loading = true
		},
		getActivitySuccess: (state, { payload }) => {
			state.hasErrors = false
			state.timestamps = payload
		},
		getActivityFailure: (state, { payload }) => {
			state.loading = false
			state.hasErrors = true
			state.errorInfo = payload
		},
		insertTimestamps: (state, { payload }) => {
			state.formattedTimestamps = payload
			state.loading = false
		}
	}
})

// Three actions from slice
export const { getActivity, getActivitySuccess, getActivityFailure, insertTimestamps } = deviceActivitySlice.actions

// Export state selector
export const deviceActivitySelector = (state) => state.deviceActivity

// Export default reducer
export default deviceActivitySlice.reducer

// Asynchronous thunk action

export function fetchActivity(id) {
	return async (dispatch) => {
		dispatch(getActivity())
		try {
			const response = await fetch(`http://localhost:8085/api/user_device/${id}/timestamps`)
			const payload = await response.json()
			if (payload.errorCode) {
				dispatch(getActivityFailure(payload))
			} else {
				dispatch(getActivitySuccess(payload))
			}
		} catch (err) {
			dispatch(getActivityFailure())
		}
	}
}

export function formatTimestamp(timestamps) {
	return (dispatch) => {
		const results = {}
		const formatTimestamps = timestamps.map((ts) => moment(ts).format('DD-MM-YYYY')).sort()
		formatTimestamps.forEach((ts) => {
			if (ts in results) {
				results[ts] += 1
			} else {
				results[ts] = 1
			}
		})
		const data = Object.entries(results).map((e) => ({ date: e[0], count: e[1] }))
		dispatch(insertTimestamps(data))
	}
}
