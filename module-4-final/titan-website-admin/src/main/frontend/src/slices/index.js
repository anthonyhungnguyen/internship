import deviceReducer from './device'
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
	device: deviceReducer
})

export default rootReducer
