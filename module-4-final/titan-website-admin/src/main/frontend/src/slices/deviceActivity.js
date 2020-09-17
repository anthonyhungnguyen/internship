import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'

export const initialState = {
	loading: true,
	errorInfo: {},
	hasErrors: false,
	timestamps: [],
	merchantFrequency: [],
	spendingFrequency: [],
	geolocationActivity: []
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
			state.merchantFrequency = payload.merchantFrequency
			state.spendingFrequency = payload.spendingFrequency
			state.geolocationActivity = payload.geolocationActivity
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
			const spendingResponse = await fetch(`http://localhost:8085/api/user_device/device/${id}/spending`)
			const geolocationResponse = await fetch(`http://localhost:8085/api/user_device/device/${id}/geolocation`)

			const timestamps = await response.json()
			const merchantFrequency = await merchantResponse.json()
			const spendingFrequency = await spendingResponse.json()
			const geolocationActivity = await geolocationResponse.json()

			if (timestamps.errorCode) {
				dispatch(getActivityFailure(timestamps))
			} else {
				dispatch(
					getActivitySuccess({
						timestamps,
						merchantFrequency,
						spendingFrequency,
						geolocationActivity
					})
				)
			}
		} catch (err) {
			dispatch(getActivityFailure())
		}
	}
}
