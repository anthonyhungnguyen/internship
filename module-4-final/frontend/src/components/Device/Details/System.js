import React from 'react'
import { useSelector } from 'react-redux'
import { deviceSelector } from '../../../slices/device'
import Android from './Android'
import IOS from './IOS'

const System = () => {
	const { device } = useSelector(deviceSelector)
	const { os_name } = device
	return (
		<div className="bg-white p-10 rounded self-start w-1/2 flex-1">
			<p className="text-gray-800 font-bold text-2xl">System</p>
			{os_name === 'android' ? <Android device={device} /> : <IOS device={device} />}
		</div>
	)
}
export default System
