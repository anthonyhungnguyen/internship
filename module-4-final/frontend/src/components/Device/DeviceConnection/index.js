import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchConnection } from '../../../slices/device_connection'
import { deviceSelector } from '../../../slices/device'
import Graph from './Graph'
import InformationBar from './InformationBar'

export default () => {
	const dispatch = useDispatch()
	const { deviceId } = useSelector(deviceSelector)
	const [ currentChosenDevice, setCurrentChosenDevice ] = useState({})
	useEffect(
		() => {
			dispatch(fetchConnection(deviceId))
		},
		[ dispatch, deviceId ]
	)

	return (
		<div className="flex">
			<Graph setCurrentChosenDevice={setCurrentChosenDevice} />
			<InformationBar currentChosenDevice={currentChosenDevice} />
		</div>
	)
}
