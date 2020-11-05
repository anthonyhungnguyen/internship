import { createSlice } from "@reduxjs/toolkit"
import moment from "moment"

export const initialState = {
    loading: false,
    errorInfo: {},
    hasErrors: false,
    graphData: {},
    devices: [],
    cards: [],
    filters: {
        range: [
            moment().subtract(1, "months").format("YYYY-MM-DD"),
            moment().format("YYYY-MM-DD"),
        ],
    },
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getConnection: (state) => {
            state.loading = true
        },
        getConnectionSuccess: (state, { payload }) => {
            state.loading = false
            state.hasErrors = false
            state.graphData = payload
        },
        getConnectionFailure: (state, { payload }) => {
            state.loading = false
            state.hasErrors = true
            state.errorInfo = payload
        },
        storeLastDate: (state, { payload }) => {
            state.date.lastOnboard = payload.last_device_onboard
            state.date.lastTransaction = payload.last_device_transaction
        },
        storeDateRange: (state, { payload }) => {
            state.filters = { ...state.filters, range: payload }
        },
    },
})

// Three actions from slice
export const {
    storeUserId,
    storeLastDate,
    getUser,
    getUserSuccess,
    getUserFailure,
    storeDateRange,
    getConnection,
    getConnectionSuccess,
    getConnectionFailure,
} = userSlice.actions

// Export state selector
export const userSelector = (state) => state.user

// Export default reducer
export default userSlice.reducer
