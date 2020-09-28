import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
	loading: true,
	errorInfo: {},
	hasErrors: false,
	id: '0CA30A94-6251-4727-8340-9B6BE942AACB',
	type: null
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
		}
	}
})

export const { getId, getIdSuccess, getIdFailure, storeId } = generalSlice.actions

export const generalSelector = (state) => state.general

export default generalSlice.reducer

export function fetchType(id) {
	return async (dispatch) => {
		dispatch(getId())
		try {
			const response = await fetch('http://localhost:8085/api/user_device/test', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					query: `LET checkList = ["devices/", "users/"]

								FOR cl IN checkList
									RETURN {type: cl, isnull: IS_NULL(DOCUMENT(CONCAT(cl, @id)))}`,
					bindVars: {
						id: id
					}
				})
			})
			const data = await response.json()
			const idType = data.filter((x) => !x.isnull)
			if (idType.length > 0) {
				const type = idType[0].type.replace('s/', '')
				dispatch(getIdSuccess(type))
			} else {
				dispatch(getIdFailure('Type Not Found'))
			}
		} catch (err) {
			dispatch(getIdFailure())
		}
	}
}
