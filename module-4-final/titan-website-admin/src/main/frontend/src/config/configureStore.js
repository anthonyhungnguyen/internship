import { combineReducers } from '@reduxjs/toolkit'
import reducers from '../reducers'
import generalReducer from '../slices/general'
import deviceReducer from '../slices/device'
import deviceConnectionReducer from '../slices/deviceConnection'
import userReducer from '../slices/user'
import userConnectionReducer from '../slices/userConnection'

const rootReducer = combineReducers({
	general: generalReducer,
	device: deviceReducer,
	deviceConnection: deviceConnectionReducer,
	user: userReducer,
	userConnection: userConnectionReducer,
	...reducers
})

export default rootReducer
