import { createSlice } from '@reduxjs/toolkit';
import {
	generateGraphData,
	configureSymbolSizeBasedOnDegree,
	generateCategoryFromType,
	generateInTypeFromOutType
} from './util';

export const initialState = {
	loading: true,
	errorInfo: {},
	hasErrors: false,
	device: null,
	graphData: {},
	date: {
		dateLoading: true,
		lastOnboard: null,
		lastTransaction: null
	},
	filters: {
		range: [ '2020-08-01', '2020-08-31' ]
	}
};

const deviceSlice = createSlice({
	name: 'device',
	initialState,
	reducers: {
		getDevice: (state) => {
			state.loading = true;
		},
		getDeviceSuccess: (state, { payload }) => {
			state.device = payload;
			state.loading = false;
			state.hasErrors = false;
		},
		getDeviceFailure: (state, { payload }) => {
			state.errorInfo = payload;
			state.loading = false;
			state.hasErrors = true;
		},
		storeUserList: (state, { payload }) => {
			state.users = payload;
		},
		storeLastDate: (state, { payload }) => {
			state.date.dateLoading = false;
			state.date.lastOnboard = payload.last_device_onboard;
			state.date.lastTransaction = payload.last_device_transaction;
		},
		storeDateRange: (state, { payload }) => {
			state.filters = { ...state.filters, range: payload };
		},
		getConnection: (state) => {
			state.loading = true;
		},
		getConnectionSuccess: (state, { payload }) => {
			state.loading = false;
			state.hasErrors = false;
			state.graphData = payload;
		},
		getConnectionFailure: (state, { payload }) => {
			state.loading = false;
			state.hasErrors = true;
			state.errorInfo = payload;
		}
	}
});

// Three actions from slice
export const {
	getDevice,
	getDeviceSuccess,
	getDeviceFailure,
	getConnection,
	getConnectionSuccess,
	getConnectionFailure,
	storeUserList,
	storeLastDate,
	storeDateRange
} = deviceSlice.actions;

// Export state selector
export const deviceSelector = (state) => state.device;

// Export default reducer
export default deviceSlice.reducer;

// Asynchronous thunk action
export function fetchDevice(id) {
	return async (dispatch) => {
		dispatch(getDevice());
		try {
			const response = await fetch(`http://localhost:8085/api/device/${id}`);

			const payload = await response.json();
			if (payload.errorCode) {
				dispatch(getDeviceFailure(payload));
			} else {
				dispatch(getDeviceSuccess(payload));
			}
		} catch (err) {
			dispatch(getDeviceFailure());
		}
	};
}

export function fetchConnection(id) {
	return async (dispatch) => {
		dispatch(getConnection());
		try {
			const graphDataResponse = await fetch(`http://localhost:8085/api/user_device/test`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					query: `FOR v, e IN 1..1 ANY @id GRAPH "test"
							COLLECT source = e._from, target = e._to
							RETURN {source, target}`,
					bindVars: {
						id: `devices/${id}`
					}
				})
			});

			const connections = await graphDataResponse.json();

			const formattedConnections = preprocessConnection(`devices/${id}`, connections);
			const graphData = generateGraphData(formattedConnections);
			if (connections.errorCode) {
				dispatch(getConnectionFailure(connections));
			} else {
				dispatch(getConnectionSuccess(graphData));
			}
		} catch (err) {
			dispatch(getConnectionFailure());
		}
	};
}

export const preprocessConnection = (id, connections) => {
	const sourceType = id.split('/')[0].trim();
	const source = id.split('/')[1].trim();
	let nodes = [
		{
			id: source,
			name: source,
			category: 0,
			type: generateInTypeFromOutType(sourceType),
			expanded: true,
			label: {
				fontWeight: 'bold'
			}
		}
	];
	const links = [];

	connections.forEach((c) => {
		const user = c['source'].split('/')[1].trim();
		nodes.push({
			id: user,
			name: user,
			category: 1,
			type: 'user',
			expanded: false
		});
		links.push({
			source: source,
			target: user
		});
	});
	let newNodes = configureSymbolSizeBasedOnDegree(nodes, links);
	return {
		nodes: newNodes,
		links: links
	};
};
