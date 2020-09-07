import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
	loading: true,
	errorInfo: {},
	hasErrors: false,
	device: null,
	deviceId: ''
}

const deviceSlice = createSlice({
	name: 'device',
	initialState,
	reducers: {
		getDevice: (state, { payload }) => {
			state.loading = true
			state.deviceId = payload
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
export const { getDevice, getDeviceSuccess, getDeviceFailure } = deviceSlice.actions

// Export state selector
export const deviceSelector = (state) => state.device

// Export default reducer
export default deviceSlice.reducer

// Asynchronous thunk action
export function fetchDevice(id) {
	return async (dispatch) => {
		dispatch(getDevice(id))
		try {
			const response = await fetch(`http://localhost:8085/api/device/${id}`)
			const payload = await response.json()
			if (payload.errorCode) {
				dispatch(getDeviceFailure(payload))
			} else {
				dispatch(getDeviceSuccess(payload))
			}
		} catch (err) {
			dispatch(getDeviceFailure())
		}
	}
}
