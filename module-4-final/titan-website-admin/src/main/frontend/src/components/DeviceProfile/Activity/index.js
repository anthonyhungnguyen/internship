import React, { useEffect } from 'react'
import ActivityFrequency from './ActivityFrequency'
import { BackTop, Skeleton } from 'antd'
import { UpCircleFilled } from '@ant-design/icons'
import { deviceSelector } from '../../../slices/device'
import { deviceActivitySelector, fetchActivity } from '../../../slices/deviceActivity'
import { useDispatch, useSelector } from 'react-redux'

export default React.memo(() => {
	const dispatch = useDispatch()
	const { deviceId } = useSelector(deviceSelector)
	const { loading, hasErrors } = useSelector(deviceActivitySelector)

	useEffect(
		() => {
			dispatch(fetchActivity(deviceId))
		},
		[ dispatch, deviceId ]
	)

	return !loading && !hasErrors ? (
		<div className="animated fadeIn">
			<ActivityFrequency />
			<BackTop>
				<UpCircleFilled style={{ fontSize: '30px', color: '#3498db' }} />
			</BackTop>
		</div>
	) : (
		<Skeleton active />
	)
})
