import React, { useEffect, useState } from 'react'
import { Card, Descriptions, Skeleton } from 'antd'
import moment from 'moment'
import axios from 'axios'
import copy from 'copy-to-clipboard'
import { Select } from 'antd'

const { Option } = Select

export default ({ id }) => {
	const [ date, setDate ] = useState(null)
	const [ devices, setDevices ] = useState(null)
	const [ cards, setCards ] = useState(null)

	useEffect(
		() => {
			const fetchLastOnboardAndTransactionDate = async () => {
				await axios
					.post(`http://localhost:8085/api/profile/lastOnboardAndLastTransaction`, {
						type: 'users',
						id: id
					})
					.then((response) => {
						const data = response.data
						const { last_device_onboard, last_device_transaction } = data[0]
						setDate({
							lastOnboard: last_device_onboard,
							lastTransaction: last_device_transaction
						})
					})
					.catch((err) => {
						console.log(err)
					})
			}

			const fetchDeviceList = async () => {
				await axios
					.post(`http://localhost:8085/api/profile/user/deviceList`, {
						type: 'users',
						id: id
					})
					.then((response) => {
						setDevices(response.data)
					})
					.catch((err) => {
						console.log(err)
					})
			}

			const fetchCardList = async () => {
				await axios
					.post(`http://localhost:8085/api/profile/user/cardList`, {
						type: 'users',
						id: id
					})
					.then((response) => {
						setCards(response.data)
					})
					.catch((err) => {
						console.log(err)
					})
			}

			fetchLastOnboardAndTransactionDate()
			fetchDeviceList()
			fetchCardList()
		},
		[ id ]
	)

	return date && devices && cards ? (
		<Card title="User Brief Info" headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }} hoverable={true}>
			<Descriptions column={1} bordered>
				<Descriptions.Item label="User ID">{id}</Descriptions.Item>
				<Descriptions.Item label="Last Onboard">
					{date.lastOnboard ? moment(date.lastOnboard).format('L LTS') : 'Unknown'}
				</Descriptions.Item>
				<Descriptions.Item label="Last Transaction">
					{date.lastTransaction ? moment(date.lastTransaction).format('L LTS') : 'Unknown'}
				</Descriptions.Item>
				{devices.length > 0 ? (
					<Descriptions.Item label={`Total Devices (${devices.length})`}>
						<Select
							defaultValue={devices[0].split('/')[1].trim()}
							style={{ width: 180 }}
							onSelect={(e) => copy(e)}
						>
							{devices.map((u) => {
								const deviceId = u.split('/')[1].trim()
								return (
									<Option value={deviceId} key={deviceId}>
										{deviceId}
									</Option>
								)
							})}
						</Select>
					</Descriptions.Item>
				) : (
					<Descriptions.Item label={`Total Devices (0)`} />
				)}

				{cards.length > 0 ? (
					<Descriptions.Item label={`Total Cards (${cards.length})`}>
						<Select
							defaultValue={cards[0].split('/')[1].trim()}
							style={{ width: 180 }}
							onSelect={(e) => copy(e)}
						>
							{cards.map((u) => {
								const cardId = u.split('/')[1].trim()
								return (
									<Option value={cardId} key={cardId}>
										{cardId}
									</Option>
								)
							})}
						</Select>
					</Descriptions.Item>
				) : (
					<Descriptions.Item label={`Total Cards (0)`} />
				)}
			</Descriptions>
		</Card>
	) : (
		<Skeleton active />
	)
}
