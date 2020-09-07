import '../styles/globals.css'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './slices'

const store = configureStore({ reducer: rootReducer })

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	)
}

export default MyApp
