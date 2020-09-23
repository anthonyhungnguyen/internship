import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'
import { storeDateRange } from './deviceActivity'

export const initialState = {
	loading: true,
	errorInfo: {},
	hasErrors: false,
	user: null,
	userId: '191213478006900'
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		storeUserId: (state, { payload }) => {
			state.deviceId = payload.trim()
		},
		getUser: (state) => {
			state.loading = true
		},
		getUserSuccess: (state, { payload }) => {
			state.user = { ...payload, timestamp: moment(parseInt(payload.timestamp) * 1000).format('L LTS') }
			state.loading = false
			state.hasErrors = false
		},
		getUserFailure: (state, { payload }) => {
			state.errorInfo = payload
			state.loading = false
			state.hasErrors = true
		}
	}
})

// Three actions from slice
export const { storeUserId, getUser, getUserSuccess, getUserFailure } = userSlice.actions

// Export state selector
export const userSelector = (state) => state.device

// Export default reducer
export default userSlice.reducer

// Asynchronous thunk action
export function fetchDevice(id) {
	return async (dispatch) => {
		dispatch(getDevice())
		try {
			const response = await fetch(`http://localhost:8085/api/device/${id}`)

			const lastReqDateResponse = await fetch('http://localhost:8085/api/user_device/test', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					query: `LET dates = (FOR v, e IN 1..1 ANY @userId users_devices
							FILTER e.type == 'transaction'
							SORT DATE_TIMESTAMP(DATE_ISO8601(e.reqDate))
							RETURN e.reqDate)
						
							RETURN [DATE_FORMAT(dates[0], @dateFormat), DATE_FORMAT(dates[-1], @dateFormat)]`,
					bindVars: {
						deviceId: `users/${id}`,
						dateFormat: '%yyyy-%mm-%dd'
					}
				})
			})

			const lastReqDate = await lastReqDateResponse.json()
			dispatch(storeDateRange(lastReqDate[0]))

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
