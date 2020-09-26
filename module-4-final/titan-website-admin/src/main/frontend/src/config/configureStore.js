import { combineReducers } from '@reduxjs/toolkit'
import reducers from '../reducers'
import generalReducer from '../slices/general'
import deviceReducer from '../slices/device'
import deviceActivityReducer from '../slices/deviceActivity'
import deviceConnectionReducer from '../slices/deviceConnection'

const rootReducer = combineReducers({
	general: generalReducer,
	device: deviceReducer,
	deviceActivity: deviceActivityReducer,
	deviceConnection: deviceConnectionReducer,
	...reducers
})

export default rootReducer
