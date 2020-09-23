import React, { useEffect, useState } from 'react'
import { Card, Descriptions } from 'antd'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import relativeTime from 'dayjs/plugin/relativeTime'
import { deviceSelector } from '../../../../../slices/device'
dayjs.extend(relativeTime)

export default () => {
	const [ recentTransaction, setRecentTransaction ] = useState(null)
	const { deviceId } = useSelector(deviceSelector)

	useEffect(() => {
		const fetchRecentTransaction = async () => {
			const response = await fetch('http://localhost:8085/api/user_device/test/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					query: `FOR v, e IN 1..1 ANY @id @@col FILTER e.type == @type 
                            SORT DATE_TIMESTAMP(DATE_ISO8601(e.reqDate)) DESC 
                            LIMIT @limit 
                            RETURN e`,
					bindVars: {
						'@col': 'users_devices',
						id: `devices/${deviceId}`,
						type: 'transaction',
						limit: 5
					}
				})
			})
			const data = await response.json()
			processRecentTransaction(data)
		}
		const processRecentTransaction = (data) => {
			const recentTransaction = {}
			recentTransaction['appTypes'] = calculateTotalAmountForEachAppType(data)
			recentTransaction['amount'] = data.map((d) => parseFloat(d.amount))
			recentTransaction['totalAmount'] = recentTransaction['amount'].reduce((a, b) => a + b)
			recentTransaction['avgAmount'] = recentTransaction['totalAmount'] / recentTransaction['amount'].length
			recentTransaction['lastTransFromNow'] = dayjs().from(dayjs(data[0]['reqDate']))
			console.log(recentTransaction)
			setRecentTransaction(recentTransaction)
		}

		const calculateTotalAmountForEachAppType = (data) => {
			const result = {}
			data.forEach((d) => {
				if (d['merchant'] in result) {
					result[d['merchant']] += parseFloat(d['amount'])
				} else {
					result[d['merchant']] = parseFloat(d['amount'])
				}
			})
			return result
		}

		fetchRecentTransaction()
	}, [])
	return (
		<Card
			title="5 Recent Transaction Activities"
			headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
			hoverable={true}
		>
			{recentTransaction && (
				<Descriptions column={1} bordered>
					<Descriptions.Item label="From Last Payment">
						{recentTransaction['lastTransFromNow']}
					</Descriptions.Item>
					<Descriptions.Item label="App Types">
						<ul>
							{Object.keys(recentTransaction['appTypes']).map((app) => (
								<li>
									{app} -{' '}
									{recentTransaction['appTypes'][app].toLocaleString('en-EN', {
										style: 'currency',
										currency: 'VND'
									})}
								</li>
							))}
						</ul>
					</Descriptions.Item>
				</Descriptions>
			)}
		</Card>
	)
}
