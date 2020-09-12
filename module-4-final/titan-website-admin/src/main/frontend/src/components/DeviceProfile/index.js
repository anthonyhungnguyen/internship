import React, { useState, useEffect } from 'react'
import Search from './Search'
import { Skeleton } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { fetchActivity } from '../../slices/deviceActivity'
import { fetchConnection } from '../../slices/deviceConnection'
import { deviceSelector, fetchDevice } from '../../slices/device'
import './index.css'
export default () => {
	const dispatch = useDispatch()
	const [ currentDeviceId, setCurrentDeviceId ] = useState('EDF10704-E7E4-4CC6-BA25-9A30C7720D02')
	const { hasErrors, loading } = useSelector(deviceSelector)
	const [ activeTab, setActiveTab ] = useState('details')

	useEffect(
		() => {
			dispatch(fetchDevice(currentDeviceId))
			dispatch(fetchActivity(currentDeviceId))
			dispatch(fetchConnection(currentDeviceId))
		},
		[ dispatch, currentDeviceId ]
	)

	return !hasErrors && !loading ? (
		<Search
			currentDeviceId={currentDeviceId}
			setCurrentDeviceId={setCurrentDeviceId}
			activeTab={activeTab}
			setActiveTab={setActiveTab}
		/>
	) : (
		<Skeleton active />
	)
}
