import fetch from 'unfetch'
import React, { useState } from 'react'
import UserPayApp from './userpayapp'
import UserRFM from './user_rfm'
import UserTransfer from './user_transfer'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import swal from 'sweetalert'

const User = () => {
	const [ currentUser, setCurrentUser ] = useState('')
	const [ userPayApp, setUserPayApp ] = useState([])
	const [ userRFM, setUserRFM ] = useState([])
	const [ userTransfer, setUserTransfer ] = useState([])
	const [ startDate, setStartDate ] = useState(new Date('2018/12/01'))
	const [ endDate, setEndDate ] = useState(new Date('2018/12/31'))
	const fetchUserPayAppID = () => {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await fetch(`http://localhost:8081/api/user/payapp/${currentUser}`)
				if (response.ok) {
					const data = await response.json()
					resolve(data)
				} else {
					swal('Error', 'User Not Found', 'error')
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
				if (response.ok) {
					const data = await response.json()
					resolve(data)
				} else {
					swal('Error', 'User Not Found', 'error')
					reject()
				}
			} catch (err) {
				swal('Error', err, 'error')
				reject()
			}
		})
	}

	const fetchUserTransfer = () => {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await fetch(
					`http://localhost:8081/api/user/transfer/${currentUser}?startDate=${moment(startDate).format(
						'YYYY-MM-DD'
					)}&endDate=${moment(endDate).format('YYYY-MM-DD')}`
				)
				if (response.ok) {
					const data = await response.json()
					const processedData = data.map((pd) => ({
						...pd,
						reqDate: moment(pd['reqDate']).format('YYYY-MM-DD')
					}))
					resolve(processedData)
				} else {
					swal('Error', 'User Not Found', 'error')
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
		const userTransfer = await fetchUserTransfer()
		setUserPayApp(userPayAppData)
		setUserRFM(userRFMData)
		setUserTransfer(userTransfer)
	}
	return (
		<div className="flex flex-col justify-center items-center">
			<form onSubmit={handleSearch} className="py-5 my-5 text-center">
				<div className="flex justify-center items-center" style={{ height: '500px' }}>
					<input
						type="text"
						name="user_id"
						placeholder="enter user_id"
						onChange={(e) => setCurrentUser(e.target.value)}
						className="py-2 px-3 mx-3 w-2/3"
					/>
					<div>
						<DatePicker
							className="py-2 px-3 mx-3"
							selected={startDate}
							onChange={(date) => setStartDate(date)}
							selectsStart
							startdate={startDate}
							endDate={endDate}
							maxDate={endDate}
							minDate={new Date('2018-12-01')}
						/>
						<DatePicker
							className="py-2 px-3 mx-3"
							selected={endDate}
							onChange={(date) => setEndDate(date)}
							selectsEnd
							startdate={startDate}
							endDate={endDate}
							minDate={startDate}
							maxDate={new Date('2018-12-31')}
						/>
					</div>

					<button type="submit" className="bg-black text-white py-2 px-3">
						Search
					</button>
				</div>
			</form>

			<UserRFM data={userRFM} />
			<UserPayApp data={userPayApp} />
			<UserTransfer data={userTransfer} />
		</div>
	)
}

export default User
