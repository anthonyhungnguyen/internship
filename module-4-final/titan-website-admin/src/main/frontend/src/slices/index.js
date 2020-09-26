import { combineReducers } from '@reduxjs/toolkit'
import deviceReducer from './device'
import deviceActivityReducer from './deviceActivity'
import deviceConnectionReducer from './deviceConnection'

const rootReducer = combineReducers({
	device: deviceReducer,
	deviceActivity: deviceActivityReducer,
	deviceConnection: deviceConnectionReducer
})

export default rootReducer
