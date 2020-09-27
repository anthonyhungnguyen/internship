import { combineReducers } from '@reduxjs/toolkit'
import reducers from '../reducers'
import generalReducer from '../slices/general'
import deviceReducer from '../slices/device'
import deviceActivityReducer from '../slices/deviceActivity'
import deviceConnectionReducer from '../slices/deviceConnection'
import userReducer from '../slices/user'
import userActivityReducer from '../slices/userActivity'
import userConnectionReducer from '../slices/userConnection'

const rootReducer = combineReducers({
	general: generalReducer,
	device: deviceReducer,
	deviceActivity: deviceActivityReducer,
	deviceConnection: deviceConnectionReducer,
	user: userReducer,
	userActivity: userActivityReducer,
	userConnection: userConnectionReducer,
	...reducers
})

export default rootReducer
