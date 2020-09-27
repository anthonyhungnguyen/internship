import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
	loading: true,
	errorInfo: {},
	hasErrors: false,
	user: null,
	devices: [],
	cards: [],
	date: {
		lastOnboard: null,
		lastTransaction: null
	},
	filters: {
		range: [ '2020-08-01', '2020-08-31' ]
	}
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		getUser: (state) => {
			state.loading = true
		},
		getUserSuccess: (state, { payload }) => {
			state.user = null
			state.loading = false
			state.hasErrors = false
			state.devices = payload.devices
			state.cards = payload.cards
		},
		getUserFailure: (state, { payload }) => {
			state.errorInfo = payload
			state.loading = false
			state.hasErrors = true
		},
		storeLastDate: (state, { payload }) => {
			state.date.lastOnboard = payload.last_device_onboard
			state.date.lastTransaction = payload.last_device_transaction
		},
		storeDateRange: (state, { payload }) => {
			state.filters = { ...state.filters, range: payload }
		}
	}
})

// Three actions from slice
export const { storeUserId, storeLastDate, getUser, getUserSuccess, getUserFailure, storeDateRange } = userSlice.actions

// Export state selector
export const userSelector = (state) => state.user

// Export default reducer
export default userSlice.reducer

// Asynchronous thunk action
export function fetchUser(id) {
	return async (dispatch) => {
		dispatch(getUser())
		try {
			const response = await fetch('http://localhost:8085/api/user_device/test', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					query: `RETURN DOCUMENT(@id)`,
					bindVars: {
						id: `users/${id}`
					}
				})
			})
			const data = await response.json()
			if (data.errorCode) {
				dispatch(getUserFailure(data))
			} else {
				const { devices, cards } = data[0]
				dispatch(getUserSuccess({ devices, cards }))
			}
		} catch (err) {
			dispatch(getUserFailure())
		}
	}
}
