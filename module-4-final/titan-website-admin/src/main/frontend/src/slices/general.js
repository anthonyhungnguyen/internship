import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
	loading: true,
	errorInfo: {},
	hasErrors: false,
	id: '0CA30A94-6251-4727-8340-9B6BE942AACB',
	type: 'devices'
}

const generalSlice = createSlice({
	name: 'general',
	initialState,
	reducers: {
		getId: (state) => {
			state.loading = true
		},
		getIdSuccess: (state, { payload }) => {
			state.type = payload
			state.loading = false
			state.hasErrors = false
		},
		getIdFailure: (state, { payload }) => {
			state.errorInfo = payload
			state.loading = false
			state.hasErrors = true
		},
		storeId: (state, { payload }) => {
			state.id = payload.trim()
		},
		storeType: (state, { payload }) => {
			state.type = payload.trim()
		}
	}
})

export const { getId, getIdSuccess, getIdFailure, storeId, storeType } = generalSlice.actions

export const generalSelector = (state) => state.general

export default generalSlice.reducer
