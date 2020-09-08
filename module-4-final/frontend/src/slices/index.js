import deviceReducer from './device'
import deviceActivity from './device_activity'
import deviceConnection from './device_connection'
import { combineReducers } from '@reduxjs/toolkit'


const rootReducer = combineReducers({
	device: deviceReducer,
	deviceActivity: deviceActivity,
	deviceConnection: deviceConnection
})

export default rootReducer
