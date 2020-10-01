import React from 'react'
import { useSelector } from 'react-redux'
import './index.css'
import DeviceProfile from './DeviceProfile'
import UserProfile from './UserProfile'
import { generalSelector } from '../../slices/general'

export default React.memo(() => {
	const { type } = useSelector(generalSelector)

	return (
		<React.Fragment>
			{type === 'devices' && <DeviceProfile />}
			{type === 'users' && <UserProfile />}
		</React.Fragment>
	)
})
