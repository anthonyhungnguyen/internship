import fetch from 'unfetch'
import React, { useState } from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, LabelList, Bar, Label } from 'recharts'

const User = () => {
	const [ currentUser, setCurrentUser ] = useState('')
	const [ userPayApp, setUserPayApp ] = useState([])
	const [ userRFM, setUserRFM ] = useState([])
	const fetchUserPayAppID = () => {
		return new Promise(async (resolve) => {
			const response = await fetch('/api/pay_appid', {
				method: 'POST',
				headers: {
					'Content-Type': 'text/plain'
				},
				body: currentUser
			})
			const data = await response.json()
			resolve(data.user_pay_app)
		})
	}

	const fetchUserRFM = () => {
		return new Promise(async (resolve) => {
			const response = await fetch('/api/user_rfm', {
				method: 'POST',
				headers: {
					'Content-Type': 'text/plain'
				},
				body: currentUser
			})
			const data = await response.json()
			resolve(data.user_rfm)
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
			<form onSubmit={handleSearch} className='flex justify-center py-5'>
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
			<BarChart width={900} height={400} data={userPayApp} margin={{ top: 30, right: 30, left: 100, bottom: 30 }}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='app_id'>
					<Label value='App ID' offset={-2} position='insideBottom' />
				</XAxis>
				<YAxis />
				<Tooltip />
				<Bar dataKey='total_amount' fill='#8884d8' label />
			</BarChart>
			<BarChart width={900} height={400} data={userRFM} margin={{ top: 30, right: 30, left: 100, bottom: 30 }}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='app_id'>
					<Label value='RFM Score' offset={-2} position='insideBottom' />
				</XAxis>
				<YAxis domain={[ 0, 5 ]} />
				<Tooltip />
				<Bar dataKey='r_score' fill='#2980b9' label />
				<Bar dataKey='f_score' fill='#e74c3c' label />
				<Bar dataKey='m_score' fill='#2ecc71' label />
			</BarChart>
		</div>
	)
}

export default User
