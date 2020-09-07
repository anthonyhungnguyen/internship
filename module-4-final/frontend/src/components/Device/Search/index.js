import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { fetchDevice, deviceSelector } from '../../../slices/device'

const Search = () => {
	const dispatch = useDispatch()

	const { deviceId } = useSelector(deviceSelector)
	const [ currentDeviceId, setCurrentDeviceId ] = useState(deviceId)

	const handleDeviceSearch = (e) => {
		e.preventDefault()
		dispatch(fetchDevice(currentDeviceId))
	}

	return (
		<form className="flex border-b w-full justify-between" onSubmit={handleDeviceSearch}>
			<input
				type="text"
				placeholder={deviceId}
				className="w-2/3 p-4"
				onChange={(e) => setCurrentDeviceId(e.target.value)}
				value={currentDeviceId}
			/>
			<button className="p-4 mr-5 bg-blue-500 w-1/12 text-white font-bold" type="submit">
				Search
			</button>
		</form>
	)
}

export default Search
