import { combineReducers } from '@reduxjs/toolkit'
import reducers from '../reducers'
import deviceReducer from '../slices/device'

const rootReducer = combineReducers({
	device: deviceReducer,
	...reducers
})

export default rootReducer

// export default function configureStore() {
//   return createStore(
//     combineReducers({
//       ...reducers
//     }),
//     {},
//   );
// }
