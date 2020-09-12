import React, { useState, useEffect } from 'react'
import Search from './Search'
import { Row, Col, Skeleton } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { fetchActivity } from '../../slices/deviceActivity'
import { fetchConnection } from '../../slices/deviceConnection'
import { deviceSelector, fetchDevice } from '../../slices/device'
import './index.css'
export default () => {
	const dispatch = useDispatch()
	const [ currentDeviceId, setCurrentDeviceId ] = useState('EDF10704-E7E4-4CC6-BA25-9A30C7720D02')
	const { hasErrors } = useSelector(deviceSelector)

	useEffect(
		() => {
			dispatch(fetchDevice(currentDeviceId))
			dispatch(fetchActivity(currentDeviceId))
			dispatch(fetchConnection(currentDeviceId))
		},
		[ dispatch, currentDeviceId ]
	)

	return !hasErrors ? (
		<Row gutter={[ 24, 24 ]}>
			<Col span={24}>
				<Search currentDeviceId={currentDeviceId} setCurrentDeviceId={setCurrentDeviceId} />
			</Col>
		</Row>
	) : (
		<Skeleton active />
	)
}
