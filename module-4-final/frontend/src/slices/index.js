import deviceReducer from './device'
import userDeviceReducer from './user_device'
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
	device: deviceReducer,
	user_device: userDeviceReducer
})

export default rootReducer
