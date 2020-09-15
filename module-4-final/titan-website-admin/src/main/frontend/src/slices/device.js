import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
	loading: true,
	errorInfo: {},
	hasErrors: false,
	device: null,
	deviceId: 'A321541E-966B-485B-87C2-9783FB0457F9'
}

const deviceSlice = createSlice({
	name: 'device',
	initialState,
	reducers: {
		storeDeviceId: (state, { payload }) => {
			state.deviceId = payload.trim()
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
export const { storeDeviceId, getDevice, getDeviceSuccess, getDeviceFailure } = deviceSlice.actions

// Export state selector
export const deviceSelector = (state) => state.device

// Export default reducer
export default deviceSlice.reducer

// Asynchronous thunk action
export function fetchDevice(id) {
	return async (dispatch) => {
		dispatch(getDevice())
		try {
			const response = await fetch(`http://localhost:8085/api/device/${id}`)
			const payload = await response.json()
			dispatch(getDeviceSuccess(payload))
		} catch (err) {
			dispatch(getDeviceFailure())
		}
	}
}
