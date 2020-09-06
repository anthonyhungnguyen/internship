import deivceReducer from './device'
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
	device: deivceReducer
})

export default rootReducer
