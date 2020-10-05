import React, { useState, useEffect } from 'react'
import { Card, Descriptions } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { Select, Skeleton } from 'antd'
import moment from 'moment'
import copy from 'copy-to-clipboard'
import { generalSelector } from '../../../../../slices/general'
import axios from 'axios'
import { storeLastDate, userSelector } from '../../../../../slices/user'
import DeviceTable from '../../../Common/Overview/Identity/DeviceTable'
import CardTable from '../../../Common/Overview/Identity/CardTable'

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
				axios
					.post(`http://localhost:8085/api/profile/user/deviceList`, {
						type: 'users',
						id: id
					})
					.then((response) => {
						const data = response.data.map((d, k) => ({
							key: k,
							deviceid: d.deviceid.split('/')[1].trim(),
							firstseen: moment(d.firstseen).format('L LT'),
							lastseen: moment(d.lastseen).format('L LT')
						}))
						setDevices(data)
					})
					.catch(console.error)
			}

			const fetchCardList = async () => {
				axios
					.post(`http://localhost:8085/api/profile/user/cardList`, {
						type: 'users',
						id: id
					})
					.then((response) => {
						const data = response.data.map((d, k) => ({
							key: k,
							cardid: d.cardid.split('/')[1].trim(),
							firstseen: moment(d.firstseen).format('L LT'),
							lastseen: moment(d.lastseen).format('L LT')
						}))
						setCards(data)
					})
					.catch(console.error)
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
						<DeviceTable data={devices} />
					</Descriptions.Item>
				) : (
					<Descriptions.Item label={`Total Devices (0)`} />
				)}

				{cards.length > 0 ? (
					<Descriptions.Item label={`Total Cards (${cards.length})`}>
						<CardTable data={cards} />
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
