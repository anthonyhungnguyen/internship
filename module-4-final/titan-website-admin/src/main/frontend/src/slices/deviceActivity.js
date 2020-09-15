import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'

export const initialState = {
	loading: true,
	errorInfo: {},
	hasErrors: false,
	timestamps: [],
	formattedTimestamps: [],
	merchantFrequency: []
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
			state.loading = false
			state.timestamps = payload.timestamps
			state.formattedTimestamps = payload.formattedTimestamps
			state.merchantFrequency = payload.merchantFrequency
		},
		getActivityFailure: (state, { payload }) => {
			state.loading = false
			state.hasErrors = true
			state.errorInfo = payload
		}
	}
})

// Three actions from slice
export const { getActivity, getActivitySuccess, getActivityFailure } = deviceActivitySlice.actions

// Export state selector
export const deviceActivitySelector = (state) => state.deviceActivity

// Export default reducer
export default deviceActivitySlice.reducer

// Asynchronous thunk action

export function fetchActivity(id) {
	return async (dispatch) => {
		dispatch(getActivity())
		try {
			const response = await fetch(`http://localhost:8085/api/user_device/device/${id}/timestamps`)
			const merchantResponse = await fetch(`http://localhost:8085/api/user_device/device/${id}/merchant`)

			const timestamps = await response.json()
			const merchantFrequency = await merchantResponse.json()
			if (timestamps.errorCode) {
				dispatch(getActivityFailure(timestamps))
			} else {
				const formattedTimestamps = formatTimestamp(timestamps)
				dispatch(getActivitySuccess({ timestamps, formattedTimestamps, merchantFrequency }))
			}
		} catch (err) {
			dispatch(getActivityFailure())
		}
	}
}

export const formatTimestamp = (timestamps) => {
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
	return data
}
