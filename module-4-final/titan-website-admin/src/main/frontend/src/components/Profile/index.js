import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { deviceSelector } from '../../slices/device'
import './index.css'
import DeviceProfile from './DeviceProfile'
import UserProfile from './UserProfile'

export default React.memo(() => {
	const { deviceId, loading } = useSelector(deviceSelector)
	const [ idType, setIdType ] = useState(null)

	useEffect(
		() => {
			const fetchIdType = async () => {
				const response = await fetch('http://localhost:8085/api/user_device/test', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						query: `LET checkList = ["devices/", "users/"]

								FOR cl IN checkList
									RETURN {type: cl, isnull: IS_NULL(DOCUMENT(CONCAT(cl, @id)))}`,
						bindVars: {
							id: deviceId
						}
					})
				})
				const data = await response.json()
				const idType = data.filter((x) => !x.isnull)[0].type.replace('s/', '')
				setIdType(idType)
			}
			fetchIdType()
		},
		[ deviceId ]
	)

	return (
		<React.Fragment>
			{idType === 'device' && <DeviceProfile />}
			{idType === 'user' && <UserProfile />}
		</React.Fragment>
	)
})
