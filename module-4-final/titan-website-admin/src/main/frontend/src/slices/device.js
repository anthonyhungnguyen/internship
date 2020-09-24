import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'
import { storeDateRange } from './deviceActivity'

export const initialState = {
	loading: true,
	errorInfo: {},
	hasErrors: false,
	device: null,
	deviceId: '0CA30A94-6251-4727-8340-9B6BE942AACB'
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
			state.device = { ...payload, timestamp: moment(parseInt(payload.timestamp) * 1000).format('L LTS') }
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

			const fetchDateRange = async () => {
				const lastReqDateResponse = await fetch('http://localhost:8085/api/user_device/test', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						query: `LET dates = (FOR v, e IN 1..1 ANY @deviceId users_devices
							FILTER e.type == 'transaction'
							SORT DATE_TIMESTAMP(DATE_ISO8601(e.reqDate))
							RETURN e.reqDate)
						
							RETURN [DATE_FORMAT(dates[0], @dateFormat), DATE_FORMAT(dates[-1], @dateFormat)]`,
						bindVars: {
							deviceId: `devices/${id}`,
							dateFormat: '%yyyy-%mm-%dd'
						}
					})
				})
				const lastReqDate = await lastReqDateResponse.json()
				dispatch(storeDateRange(lastReqDate[0]))
			}
			fetchDateRange()

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
