import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
	loading: true,
	errorInfo: {},
	hasErrors: false,
	cardAccount: {
		timestamp: [],
		status: [],
		bank: []
	},
	timestamps: [],
	merchantFrequency: [],
	spendingFrequency: [],
	geolocationActivity: [],
	appid: [],
	filters: {
		range: [ '2020-08-01', '2020-08-31' ]
	}
}

const userActivitySlice = createSlice({
	name: 'userActivity',
	initialState,
	reducers: {
		getActivity: (state) => {
			state.loading = true
		},
		getActivitySuccess: (state, { payload }) => {
			state.hasErrors = false
			state.loading = false
			state.cardAccount.status = payload.cardAccountStatus
			state.cardAccount.timestamp = payload.cardAccountStatusEachDay
			state.cardAccount.bank = payload.bankStatus
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
export const { getActivity, getActivitySuccess, getActivityFailure, storeDateRange } = userActivitySlice.actions

// Export state selector
export const userActivitySelector = (state) => state.userActivity

// Export default reducer
export default userActivitySlice.reducer

// Asynchronous thunk action

export function fetchActivity(id, filters) {
	return async (dispatch) => {
		dispatch(getActivity())
		try {
			const queryString = `
            LET cardAccountStatus = (
				FOR v, e IN 1..1 ANY @id user_card_account
				COLLECT status = e.requestStatus WITH COUNT INTO status_count
				RETURN {status, status_count}
			)

			LET cardAccountStatusEachDay = (
				FOR v, e IN 1..1 ANY @id user_card_account
				COLLECT date = DATE_FORMAT(DATE_ISO8601(e.reqDate), "%yyyy-%mm-%dd"), status = e.requestStatus WITH COUNT INTO status_count
				SORT DATE_TIMESTAMP(date)
				RETURN {date, status, status_count}
			)

			LET bankStatus = (
				FOR v,e IN 1..1 ANY @id user_card_account
				COLLECT bName = e.bankname, status = e.requestStatus WITH count INTO status_count 
				RETURN {bName, status, status_count}
			)
			
			LET spending = (
				FOR v, e IN 1..1 ANY @id user_device_transaction
				COLLECT date = DATE_FORMAT(DATE_TIMESTAMP(e.reqDate), '%dd-%mm-%yyyy')
				AGGREGATE amount = SUM(TO_NUMBER(e.amount)), frequency = count(e.reqDate)
				RETURN {date, amount, frequency}
			)

			LET merchant = (
				FOR v, e IN 1..1 ANY @id user_device_transaction
				COLLECT merchant = e.merchant
				AGGREGATE merchant_count = COUNT(e.merchant), merchant_total = SUM(TO_NUMBER(e.amount))
				SORT merchant_count DESC
				RETURN {merchant, merchant_count,merchant_total}
			)

			LET appid = (
				FOR v, e IN 1..1 ANY @id user_device_transaction
				COLLECT app_id = e.appid 
				AGGREGATE app_total = SUM(TO_NUMBER(e.amount)), app_id_count = COUNT(e.appid)
				SORT app_id_count, app_total
				RETURN {app_id, app_id_count, app_total}
			)

			LET geolocation = (
				FOR v, e IN 1..1 ANY @id user_device_transaction
				FILTER e.latitude != '0.0' AND e.longitude != '0.0'
				COLLECT lat = e.latitude,
						lng = e.longitude WITH COUNT INTO location_count
				RETURN {lat, lng, location_count}
			)
			
			RETURN {cardAccountStatus, cardAccountStatusEachDay, bankStatus, spending, merchant, appid, geolocation}
			`
			const response = await fetch('http://localhost:8085/api/user_device/test', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					query: queryString,
					bindVars: {
						id: `users/${id}`
					}
				})
			})

			const data = await response.json()

			if (data.errorCode) {
				dispatch(getActivityFailure(data.errorCode))
			} else {
				const {
					cardAccountStatus,
					cardAccountStatusEachDay,
					bankStatus,
					spending,
					merchant,
					appid,
					geolocation
				} = data[0]
				dispatch(
					getActivitySuccess({
						cardAccountStatus,
						cardAccountStatusEachDay,
						bankStatus,
						spending,
						merchant,
						appid,
						geolocation
					})
				)
			}
		} catch (err) {
			dispatch(getActivityFailure())
		}
	}
}
