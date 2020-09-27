import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
	loading: true,
	errorInfo: {},
	hasErrors: false,
	device: null,
	date: {
		dateLoading: true,
		lastOnboard: null,
		lastTransaction: null
	},
	filters: {
		range: [ '2020-08-01', '2020-08-31' ]
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
		}
	}
})

// Three actions from slice
export const {
	getDevice,
	getDeviceSuccess,
	getDeviceFailure,
	storeUserList,
	storeLastDate,
	storeDateRange
} = deviceSlice.actions

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
