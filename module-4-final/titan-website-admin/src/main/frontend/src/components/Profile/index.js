import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './index.css'
import DeviceProfile from './DeviceProfile'
import UserProfile from './UserProfile'
import { fetchType, generalSelector } from '../../slices/general'
import { Skeleton } from 'antd'

export default React.memo(() => {
	const { id, type, loading } = useSelector(generalSelector)
	const dispatch = useDispatch()

	useEffect(
		() => {
			dispatch(fetchType(id))
		},
		[ dispatch, id ]
	)

	return !loading ? (
		<React.Fragment>
			{type === 'device' && <DeviceProfile />}
			{type === 'user' && <UserProfile />}
		</React.Fragment>
	) : (
		<Skeleton />
	)
})
