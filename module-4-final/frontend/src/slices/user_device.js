import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    loading: true,
    errorInfo: {},
    hasErrors: false,
    timestamps: []
}

const userDeviceSlice = createSlice({
    name: 'user_device',
    initialState,
    reducers: {
        getActivity: (state) => {
            state.loading = true
        },
        getActivitySuccess: (state, { payload }) => {
            state.loading = false
            state.hasErrors = false
            state.timestamps = payload
        },
        getActivityFailure: (state, { payload }) => {
            state.loading = false
            state.hasErrors = true
            state.errorInfo = payload
        }
    }
})

// Three actions from slice
export const { getActivity, getActivitySuccess, getActivityFailure } = userDeviceSlice.actions

// Export state selector
export const userDeviceSelector = (state) => state.user_device

// Export default reducer
export default userDeviceSlice.reducer

// Asynchronous thunk action

export function fetchActivity(id) {
    return async (dispatch) => {
        dispatch(getActivity())
        try {
            const response = await fetch(`http://localhost:8085/api/user_device/${id}`)
            const payload = await response.json()
            if (payload.errorCode) {
                dispatch(getActivityFailure(payload))
            } else {
                dispatch(getActivitySuccess(payload))
            }
        } catch (err) {
            dispatch(getActivityFailure())
        }
    }
}