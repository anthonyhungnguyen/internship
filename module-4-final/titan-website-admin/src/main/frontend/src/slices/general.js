import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
    loading: true,
    errorInfo: {},
    hasErrors: false,
    id: "160516000000002",
    type: "userid",
    exist: true,
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
    },
})

export const {
    getId,
    getIdSuccess,
    getIdFailure,
    storeId,
    storeType,
    storeExist,
} = generalSlice.actions

export const generalSelector = (state) => state.general

export default generalSlice.reducer
