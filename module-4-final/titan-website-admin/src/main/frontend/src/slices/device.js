import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'
import { storeDateRange } from './deviceActivity'

export const initialState = {
	loading: true,
	errorInfo: {},
	hasErrors: false,
	device: null,
	deviceId: '0CA30A94-6251-4727-8340-9B6BE942AACB',
	score: {
		hardware: {
			score: 0,
			details: []
		}
	}
}

const deviceSlice = createSlice({
	name: 'device',
	initialState,
	reducers: {
		storeDeviceId: (state, { payload }) => {
			state.deviceId = payload.trim()
		},
		getDevice: (state) => {
			state.loading = true
		},
		getDeviceSuccess: (state, { payload }) => {
			state.device = { ...payload, timestamp: moment(parseInt(payload.timestamp) * 1000).format('L LTS') }
			state.loading = false
			state.hasErrors = false
		},
		getDeviceFailure: (state, { payload }) => {
			state.errorInfo = payload
			state.loading = false
			state.hasErrors = true
		},
		storeScore: (state, {payload}) => {
			state.score.hardware.score = payload.score
			state.score.hardware.details = payload.details
		}
	}
})

// Three actions from slice
export const { storeDeviceId, getDevice, getDeviceSuccess, getDeviceFailure, storeScore } = deviceSlice.actions

// Export state selector
export const deviceSelector = (state) => state.device

// Export default reducer
export default deviceSlice.reducer

// Asynchronous thunk action
export function fetchDevice(id) {
	return async (dispatch) => {
		dispatch(getDevice())
		try {
			const response = await fetch(`http://localhost:8085/api/device/${id}`)

			const lastReqDateResponse = await fetch('http://localhost:8085/api/user_device/test', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					query: `LET dates = (FOR v, e IN 1..1 ANY @deviceId users_devices
							FILTER e.type == 'transaction'
							SORT DATE_TIMESTAMP(DATE_ISO8601(e.reqDate))
							RETURN e.reqDate)
						
							RETURN [DATE_FORMAT(dates[0], @dateFormat), DATE_FORMAT(dates[-1], @dateFormat)]`,
					bindVars: {
						deviceId: `devices/${id}`,
						dateFormat: '%yyyy-%mm-%dd'
					}
				})
			})

			const scoreResponse = await fetch('http://localhost:8085/api/user_device/test', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					query: `LET fields = @fields

					LET model = (FOR v, e IN 1..1 ANY @id device_devicemodel RETURN e._to)[0]
					
					LET devices_included = (FOR v, e IN 1..1 INBOUND model device_devicemodel RETURN DOCUMENT(e._from))
					
					LET total_devices = COUNT(devices_included)
					
					LET id_doc = DOCUMENT(@id)
					
					FOR lf in fields
						LET field_count = COUNT(FOR v IN devices_included FILTER v[lf] == id_doc[lf] RETURN v)
						RETURN {field: lf, value: id_doc[lf], percent: field_count/total_devices}
					
					`,
					bindVars: {
						fields: ["hw_board","hw_cpu_name","hw_screen_aspect_ratio","hw_screen_class","battery_type","hw_screen_pixel_density","hw_cpu_speed","hw_screen_refresh_rate","hw_cpu_supported_64_bit_abis","hw_cpu_core_count","hw_cpu_supported_32_bit_abis","hw_cpu_processor","hw_screen_size","hw_cpu_supported_abis","hw_ram_total","hw_cpu_min_speed","hw_storage_total", "os_version"],
						id: `devices/${id}`
					}
				})
			})

			const scorePercent = await scoreResponse.json()
			const {score, scoreData} = calculateScore(scorePercent)
			dispatch(storeScore({score: score.toFixed(2), details: scoreData}))

			const lastReqDate = await lastReqDateResponse.json()
			dispatch(storeDateRange(lastReqDate[0]))

			const payload = await response.json()
			if (payload.errorCode) {
				dispatch(getDeviceFailure(payload))
			} else {
				dispatch(getDeviceSuccess(payload))
			}
		} catch (err) {
			dispatch(getDeviceFailure())
		}
	}
}


const calculateScore = (scoreList) => {
	let score = 0
	const scoreData = []

	const list_weight_1 = ['hw_cpu_name','hw_screen_aspect_ratio','hw_screen_class','battery_type','hw_cpu_speed','hw_cpu_core_count','hw_cpu_supported_64_bit_abis','hw_cpu_supported_32_bit_abis','hw_cpu_processor','hw_cpu_supported_abis']
	const list_weight_2 = ['hw_board','hw_screen_size','hw_cpu_min_speed','os_version']
	const list_weight_3 = ['hw_screen_pixel_density','hw_ram_total','hw_storage_total','hw_screen_refresh_rate']
	scoreList.forEach((s) => {
		if (!['nan', "", "0.0", "0"].includes(s['value'])) {

			if(list_weight_1.includes(s['field'])) {
				const fieldScore = 3 * (1-s['percent'])
				score += fieldScore
				scoreData.push({field: s['field'], score: fieldScore})
			} else if (list_weight_2.includes(s['field'])) {
				const fieldScore = 2 * (1-s['percent'])
				score += fieldScore
				scoreData.push({field: s['field'], score: fieldScore})
			} else if (list_weight_3.includes(s['field'])) {
				const fieldScore =  (1-s['percent'])
				score += fieldScore
				scoreData.push({field: s['field'], score: fieldScore})
			}
		}
	})
	return {score, scoreData}

}