import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchActivity } from '../../../slices/device_activity'

import { deviceSelector } from '../../../slices/device'
import ActiveFrequency from './ActiveFrequency'

const Activity = () => {
	const dispatch = useDispatch()
	const { deviceId } = useSelector(deviceSelector)

	useEffect(
		() => {
			dispatch(fetchActivity(deviceId))
		},
		[ dispatch, deviceId ]
	)

	return (
		<div className="flex justify-center items-center flex-col">
			<p className="text-2xl font-bold">Active Date Frequency</p>
			<ActiveFrequency />
		</div>
	)
}

export default Activity
