import { combineReducers } from "@reduxjs/toolkit"
import reducers from "../reducers"
import generalReducer from "../slices"

const rootReducer = combineReducers({
    general: generalReducer,
    ...reducers,
})

export default rootReducer
