import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    loading: true,
    errorInfo: {},
    hasErrors: false,
    connections: [],
    data: {}
}

const deviceConnectionSlice = createSlice({
    name: 'deviceConnection',
    initialState,
    reducers: {
        getConnection: (state) => {
            state.loading = true
        },
        getConnectionSuccess: (state, { payload }) => {
            state.loading = false
            state.hasErrors = false
            state.connections = payload
        },
        getConnectionFailure: (state, { payload }) => {
            state.loading = false
            state.hasErrors = true
            state.errorInfo = payload
        },
        insertConnectionData: (state, { payload }) => {
            state.data = payload
        },
    }
})

// Three actions from slice
export const { getConnection, getConnectionSuccess, getConnectionFailure, insertConnectionData } = deviceConnectionSlice.actions

// Export state selector
export const deviceConnectionSelector = (state) => state.deviceConnection

// Export default reducer
export default deviceConnectionSlice.reducer

// Asynchronous thunk action

export function fetchConnection(id) {
    return async (dispatch) => {
        dispatch(getConnection())
        try {
            const response = await fetch(`http://localhost:8085/api/user_device/${id}/connections`)
            const payload = await response.json()
            if (payload.errorCode) {
                dispatch(getConnectionFailure(payload))
            } else {
                dispatch(getConnectionSuccess(payload))
            }
        } catch (err) {
            dispatch(getConnectionFailure())
        }
    }
}