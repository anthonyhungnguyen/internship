import graphReducer from './graph'
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
	graph: graphReducer
})

export default rootReducer
