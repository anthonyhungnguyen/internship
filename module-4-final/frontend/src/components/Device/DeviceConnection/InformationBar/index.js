import React from 'react'
import Android from '../../Details/Android'
import IOS from '../../Details/IOS'
export default ({ currentChosenDevice }) => {
	return (
		<div className="h-screen w-1/3 p-4 bg-white p-10 rounded self-start flex-1 border-2 m-2">
			<p className="font-bold">Device Details</p>
			{currentChosenDevice && currentChosenDevice['os_name'] === 'android' ? (
				<Android device={currentChosenDevice} />
			) : (
				<IOS device={currentChosenDevice} />
			)}
		</div>
	)
}
