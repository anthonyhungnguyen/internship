import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
	loading: true,
	errorInfo: {},
	hasErrors: false,
	timestamps: [],
	merchantFrequency: [],
	spendingFrequency: [],
	geolocationActivity: [],
	appid: [],
	filters: {
		range: [ '2020-08-01', '2020-08-31' ]
	}
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
			state.merchantFrequency = payload.merchant
			state.spendingFrequency = payload.spending
			state.geolocationActivity = payload.geolocation
			state.appid = payload.appid
		},
		getActivityFailure: (state, { payload }) => {
			state.loading = false
			state.hasErrors = true
			state.errorInfo = payload
		},
		storeDateRange: (state, { payload }) => {
			state.filters = { ...state.filters, range: payload }
		}
	}
})

// Three actions from slice
export const { getActivity, getActivitySuccess, getActivityFailure, storeDateRange } = deviceActivitySlice.actions

// Export state selector
export const deviceActivitySelector = (state) => state.deviceActivity

// Export default reducer
export default deviceActivitySlice.reducer

// Asynchronous thunk action

export function fetchActivity(id, filters) {
	return async (dispatch) => {
		dispatch(getActivity())
		try {
			const queryString = `
            LET timestamps = (
				FOR v, e IN 1..1 INBOUND @deviceId users_devices
				FILTER e.type == 'user_use_device' 
				AND TO_NUMBER(e.timestamp*1000) >= DATE_TIMESTAMP(@fromDate) AND TO_NUMBER(e.timestamp*1000) <= DATE_TIMESTAMP(@toDate)
				COLLECT date = DATE_FORMAT(DATE_ADD(DATE_ISO8601(TO_NUMBER(e.timestamp) * 1000), 7, 'hour'), @dateFormat) WITH COUNT INTO date_count
				RETURN {date, date_count}
			)
				
			LET merchant = (
				FOR v, e IN 1..1 INBOUND @deviceId users_devices
				FILTER e.type == 'transaction' 
				AND DATE_TIMESTAMP(e.reqDate) >= DATE_TIMESTAMP(@fromDate) AND DATE_TIMESTAMP(e.reqDate) <= DATE_TIMESTAMP(@toDate)
				COLLECT merchant = e.merchant
				AGGREGATE merchant_count = COUNT(e.merchant), merchant_total = SUM(TO_NUMBER(e.amount))
				SORT merchant_count DESC
				RETURN {merchant, merchant_count,merchant_total}
			)
			
			LET spending = (
				FOR v, e IN 1..1 INBOUND @deviceId users_devices
				FILTER e.type == 'transaction' AND e.merchant != 'Money Transfer' 
				AND DATE_TIMESTAMP(e.reqDate) >= DATE_TIMESTAMP(@fromDate) AND DATE_TIMESTAMP(e.reqDate) <= DATE_TIMESTAMP(@toDate)
				COLLECT date = DATE_FORMAT(DATE_TIMESTAMP(e.reqDate), @dateFormat)
				AGGREGATE amount = SUM(TO_NUMBER(e.amount))
				RETURN {date, amount}
			)
			
			LET geolocation = (
				FOR v, e IN 1..1 INBOUND @deviceId users_devices
				FILTER e.type == 'transaction' AND e.latitude != '0.0' AND e.longitude != '0.0'
				AND DATE_TIMESTAMP(e.reqDate) >= DATE_TIMESTAMP(@fromDate) AND DATE_TIMESTAMP(e.reqDate) <= DATE_TIMESTAMP(@toDate)
				COLLECT lat = e.latitude,
						lng = e.longitude WITH COUNT INTO location_count
				RETURN {lat, lng, location_count}
			)
			
			LET appid = (
				FOR v, e IN 1..1 INBOUND @deviceId users_devices
				FILTER e.type == 'transaction' 
				AND DATE_TIMESTAMP(e.reqDate) >= DATE_TIMESTAMP(@fromDate) AND DATE_TIMESTAMP(e.reqDate) <= DATE_TIMESTAMP(@toDate)
				COLLECT app_id = e.appid 
				AGGREGATE app_total = SUM(TO_NUMBER(e.amount)), app_id_count = COUNT(e.appid)
				SORT app_id_count, app_total
				RETURN {app_id, app_id_count, app_total}
			)
			
			
			RETURN {timestamps, merchant, spending, geolocation, appid}
			`
			const response = await fetch('http://localhost:8085/api/user_device/test', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					query: queryString,
					bindVars: {
						deviceId: `devices/${id}`,
						dateFormat: '%dd-%mm-%yyyy',
						fromDate: filters.range[0],
						toDate: filters.range[1]
					}
				})
			})

			const data = await response.json()
			const { timestamps, merchant, spending, geolocation, appid } = data[0]

			if (timestamps.errorCode) {
				dispatch(getActivityFailure(timestamps))
			} else {
				dispatch(
					getActivitySuccess({
						timestamps,
						merchant,
						spending,
						geolocation,
						appid
					})
				)
			}
		} catch (err) {
			dispatch(getActivityFailure())
		}
	}
}
