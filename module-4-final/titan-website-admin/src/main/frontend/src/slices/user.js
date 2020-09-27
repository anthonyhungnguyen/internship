import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
	loading: true,
	errorInfo: {},
	hasErrors: false,
	user: null,
	devices: [],
	cards: []
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
		}
	}
})

// Three actions from slice
export const { storeUserId, getUser, getUserSuccess, getUserFailure } = userSlice.actions

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
					query: `
					LET devices_related = (FOR v, e IN 1..1 ANY @id user_device_onboard
						COLLECT devices = e._to
						RETURN devices)
					
					LET cards_related = (FOR v, e IN 1..1 ANY @id user_card_account
						COLLECT cards = e._to
						RETURN cards)
						
					RETURN {devices: devices_related, cards: cards_related}
					`,
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
