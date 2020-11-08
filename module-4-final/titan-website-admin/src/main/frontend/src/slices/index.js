import { createSlice } from "@reduxjs/toolkit"
import moment from "moment"

export const initialState = {
    loading: true,
    errorInfo: {},
    hasErrors: false,
    id: "160516000000002",
    type: "userid",
    exist: true,
    useGPU: false,
    filters: {
        range: [
            moment().subtract(1, "months").format("YYYY-MM-DD"),
            moment().format("YYYY-MM-DD"),
        ],
    },
}

const generalSlice = createSlice({
    name: "general",
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
        },
        storeExist: (state, { payload }) => {
            state.exist = payload
        },
        storeDateRange: (state, { payload }) => {
            state.filters = { ...state.filters, range: payload }
        },
        storeUseGPU: (state, { payload }) => {
            state.useGPU = payload
        },
    },
})

export const {
    getId,
    getIdSuccess,
    getIdFailure,
    storeId,
    storeType,
    storeExist,
    storeDateRange,
    storeUseGPU,
} = generalSlice.actions

export const generalSelector = (state) => state.general

export default generalSlice.reducer
