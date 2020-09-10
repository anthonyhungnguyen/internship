import { combineReducers } from '@reduxjs/toolkit'
import reducers from '../reducers'
import deviceReducer from '../slices/device'
import deviceActivityReducer from '../slices/deviceActivity'
import deviceConnectionReducer from '../slices/deviceConnection'

const rootReducer = combineReducers({
	device: deviceReducer,
	deviceActivity: deviceActivityReducer,
	deviceConnection: deviceConnectionReducer,
	...reducers
})

export default rootReducer
