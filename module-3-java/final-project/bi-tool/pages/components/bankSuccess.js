import fetch from 'unfetch'
import React, { useEffect, useState } from 'react'
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from 'recharts'
import moment from 'moment'
import swal from 'sweetalert'

const BankSuccess = () => {
	const [ bank, setBank ] = useState([])
	const [ currentBank, setCurrentBank ] = useState('BIDV')
	const [ bankSuccess, setBankSuccess ] = useState([])

	useEffect(() => {
		const fetchBank = async () => {
			const bankReq = await fetch('http://localhost:8081/api/bank')
			const bankRes = await bankReq.json()
			const bankProcessed = bankRes.map((b) => b.id)
			setBank(bankProcessed)
		}
		fetchBank()
	}, [])

	useEffect(
		() => {
			const fetchBankSuccess = async () => {
				const response = await fetch(`http://localhost:8081/api/bank/${currentBank}`)
				const data = await response.json()
				const dataProcessed = data.map((b) => ({
					...b,
					successRate: (b.successRate * 100).toPrecision(5),
					recordedDate: moment(b.recordedDate).format('YYYY-MM-DD')
				}))
				setBankSuccess(dataProcessed)
			}
			fetchBankSuccess()
		},
		[ currentBank ]
	)

	const fetchWithTimeout = (url, timeout = 2000) => {
		return Promise.race([ fetch(url), new Promise((_, reject) => setTimeout(() => reject('Timeout'), timeout)) ])
	}

	const getAllBanksTimeout = async () => {
		await fetchWithTimeout('http://localhost:8081/api/bank/timeout')
			.then(async (d) => {
				const bankRes = await d.json()
				const bankProcessed = bankRes.map((b) => b.id)
				setBankSuccess(bankProcessed)
			})
			.catch((msg) => {
				swal('Error', msg, 'error')
			})
	}

	const handleBankChange = (e) => {
		setCurrentBank(e.target.value)
	}

	return (
		<div className='flex flex-col justify-center items-center'>
			<div className='inline-block relative w-auto py-4'>
				<select
					className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
					onChange={handleBankChange}
				>
					{bank && bank.map((b) => <option key={b}>{b}</option>)}
				</select>
				<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
					<svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
						<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
					</svg>
				</div>
			</div>

			<button onClick={getAllBanksTimeout} className='p-2 my-2 border-2 border-black'>
				Test Timeout
			</button>

			<LineChart
				width={1200}
				height={300}
				data={bankSuccess}
				margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
			>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='recordedDate' />
				<YAxis domain={[ 0, 100 ]} />
				<Tooltip />
				<Line type='monotone' dataKey='successRate' stroke='#8884d8' />
			</LineChart>
		</div>
	)
}

export default BankSuccess
