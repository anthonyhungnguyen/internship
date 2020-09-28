import { combineReducers } from '@reduxjs/toolkit';
import reducers from '../reducers';
import generalReducer from '../slices/general';
import deviceReducer from '../slices/device';
import userReducer from '../slices/user';

const rootReducer = combineReducers({
	general: generalReducer,
	device: deviceReducer,
	user: userReducer,
	...reducers
});

export default rootReducer;
