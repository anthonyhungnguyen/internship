import fetch from 'unfetch'
import React, { useState } from 'react'
import UserPayApp from './userPayApp'
import UserRFM from './userRFM'
import UserTransfer from './userTransfer'
import swal from 'sweetalert'

const User = () => {
	const [ currentUser, setCurrentUser ] = useState('')
	const [ userPayApp, setUserPayApp ] = useState([])
	const [ userRFM, setUserRFM ] = useState([])

	const fetchUserPayAppID = () => {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await fetch(`http://localhost:8081/api/user/payapp/${currentUser}`)
				const data = await response.json()
				if (response.ok) {
					const preprocessed = data.map((d) => ({
						...d,
						totalAmount: d['totalAmount'].toLocaleString('en-US', { style: 'currency', currency: 'VND' })
					}))
					resolve(preprocessed)
				} else {
					swal('Error', data['message'], 'error')
					reject()
				}
			} catch (err) {
				swal('Error', err, 'error')
				reject()
			}
		})
	}

	const fetchUserRFM = () => {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await fetch(`http://localhost:8081/api/user/rfm/${currentUser}`)
				const data = await response.json()
				if (response.ok) {
					data['monetary'] = data['monetary'].toLocaleString('en-US', { style: 'currency', currency: 'VND' })
					resolve(data)
				} else {
					swal('Error', data['message'], 'error')
					reject()
				}
			} catch (err) {
				swal('Error', err, 'error')
				reject()
			}
		})
	}

	const handleSearch = async (e) => {
		e.preventDefault()
		const userPayAppData = await fetchUserPayAppID()
		const userRFMData = await fetchUserRFM()
		setUserPayApp(userPayAppData)
		setUserRFM(userRFMData)
	}
	return (
		<div className='flex flex-col justify-center items-center'>
			<form onSubmit={handleSearch} className='flex justify-center items-center py-5 my-5 text-center'>
				<input
					type='text'
					name='user_id'
					placeholder='enter user_id'
					onChange={(e) => setCurrentUser(e.target.value)}
					className='py-2 px-3 mx-3'
				/>

				<button type='submit' className='bg-black text-white py-2 px-3'>
					Search
				</button>
			</form>

			<UserRFM data={userRFM} />
			<UserPayApp data={userPayApp} />
			<UserTransfer />
		</div>
	)
}

export default User
