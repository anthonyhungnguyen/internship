import React, { useState, useEffect } from 'react'
import { Card, Descriptions } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { Select, Skeleton } from 'antd'
import moment from 'moment'
import copy from 'copy-to-clipboard'
import { generalSelector } from '../../../../../slices/general'
import axios from 'axios'
import { storeLastDate, userSelector } from '../../../../../slices/user'

const { Option } = Select

export default () => {
	const { id } = useSelector(generalSelector)
	const { date } = useSelector(userSelector)
	const [ devices, setDevices ] = useState(null)
	const [ cards, setCards ] = useState(null)
	const dispatch = useDispatch()

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
						dispatch(storeLastDate({ last_device_onboard, last_device_transaction }))
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
		[ id, dispatch ]
	)

	return date && devices && cards ? (
		<Card title="Identity" headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }} hoverable={true}>
			<Descriptions column={1} bordered>
				<Descriptions.Item label="User ID">{id}</Descriptions.Item>
				<Descriptions.Item label="Last Device Onboard">
					{date.lastOnboard ? moment(date.lastOnboard).format('L LTS') : 'Unknown'}
				</Descriptions.Item>
				<Descriptions.Item label="Last Device Transaction">
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
