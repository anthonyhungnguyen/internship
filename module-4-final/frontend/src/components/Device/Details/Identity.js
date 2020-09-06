import React from 'react'
import { useSelector } from 'react-redux'
import { deviceSelector } from '../../../slices/device'
const Identity = () => {
	const { device } = useSelector(deviceSelector)
	const { id, users } = device
	return (
		<div className="bg-white p-10 rounded self-start w-full">
			<p className="text-gray-800 font-bold text-2xl">Identity</p>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">Device ID</span>
				<span className="w-2/3">{id}</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">Total Users</span>
				<span className="w-2/3">
					<select>
						<option>{users.length}</option>
						{users.map((u) => (
							<option key={u.id} value={u.id}>
								{u.id}
							</option>
						))}
					</select>
				</span>
			</div>
		</div>
	)
}

export default Identity
