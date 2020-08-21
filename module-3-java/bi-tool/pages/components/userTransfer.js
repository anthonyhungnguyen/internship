import MUIDataTable from 'mui-datatables'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import React, { useState } from 'react'

const columns = [
	{
		name: 'receiver',
		label: 'Receiver',
		options: {
			filter: false,
			sort: false
		}
	},
	{
		name: 'transId',
		label: 'Transaction ID',
		options: {
			filter: false,
			sort: false
		}
	},
	{
		name: 'reqDate',
		label: 'Request Date',
		options: {
			filter: false,
			sort: false
		}
	},
	{
		name: 'amount',
		label: 'Amount',
		options: {
			sort: true
		}
	}
]

const options = {
	download: false,
	print: false
}

const UserTransfer = () => {
	const [ currentUser, setCurrentUser ] = useState('')
	const [ startDate, setStartDate ] = useState(new Date('2018/12/01'))
	const [ endDate, setEndDate ] = useState(new Date('2018/12/31'))
	const [ userTransfer, setUserTransfer ] = useState([])

	const fetchUserTransfer = () => {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await fetch(
					`http://localhost:8081/api/user/transfer/${currentUser}?startDate=${moment(startDate).format(
						'YYYY-MM-DD'
					)}&endDate=${moment(endDate).format('YYYY-MM-DD')}`
				)
				const data = await response.json()
				if (response.ok) {
					const processedData = data.map((pd) => ({
						...pd,
						amount: pd['amount'].toLocaleString('en-US', { style: 'currency', currency: 'VND' }),
						reqDate: moment(pd['reqDate']).format('YYYY-MM-DD')
					}))
					resolve(processedData)
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
		const userTransfer = await fetchUserTransfer()
		setUserTransfer(userTransfer)
	}
	return (
		<div className='w-2/3'>
			<form onSubmit={handleSearch} className='text-center'>
				<div className='flex justify-center items-center' style={{ height: '480px' }}>
					<input
						type='text'
						name='user_id'
						placeholder='enter sender id'
						onChange={(e) => setCurrentUser(e.target.value)}
						className='py-2 px-3 mx-3 border-solid border-2 rounded'
					/>
					<div>
						<DatePicker
							className='py-2 px-3 mx-3'
							selected={startDate}
							onChange={(date) => setStartDate(date)}
							selectsStart
							startdate={startDate}
							endDate={endDate}
							maxDate={endDate}
							minDate={new Date('2018-12-01')}
						/>
						<DatePicker
							className='py-2 px-3 mx-3'
							selected={endDate}
							onChange={(date) => setEndDate(date)}
							selectsEnd
							startdate={startDate}
							endDate={endDate}
							minDate={startDate}
							maxDate={new Date('2018-12-31')}
						/>
					</div>

					<button type='submit' className='bg-black text-white py-2 px-3'>
						Search
					</button>
				</div>
			</form>
			<MUIDataTable
				title={'User Transfer'}
				data={userTransfer}
				columns={columns}
				options={options}
				className='w-full my-5'
			/>
		</div>
	)
}

export default UserTransfer
