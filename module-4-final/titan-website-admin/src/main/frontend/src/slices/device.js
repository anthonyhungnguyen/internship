import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'
import { storeDateRange } from './deviceActivity'

export const initialState = {
	loading: true,
	errorInfo: {},
	hasErrors: false,
	device: null,
	users: null
}

const deviceSlice = createSlice({
	name: 'device',
	initialState,
	reducers: {
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
		},
		storeUserList: (state, { payload }) => {
			state.users = payload
		}
	}
})

// Three actions from slice
export const { storeDeviceId, getDevice, getDeviceSuccess, getDeviceFailure, storeUserList } = deviceSlice.actions

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
						query: `LET dates = (FOR v, e IN 1..1 ANY @deviceId user_device_transaction
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

			const fetchUserList = async (id) => {
				const userListResponse = await fetch('http://localhost:8085/api/user_device/test', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						query: `FOR v, e IN 1..1 ANY @deviceId user_device_onboard
								COLLECT user = e._from
								RETURN user`,
						bindVars: {
							deviceId: `devices/${id}`
						}
					})
				})
				const userList = await userListResponse.json()
				dispatch(storeUserList(userList))
			}
			fetchUserList(id)

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
