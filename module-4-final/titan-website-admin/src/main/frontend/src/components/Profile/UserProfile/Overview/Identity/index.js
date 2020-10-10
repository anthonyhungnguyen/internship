import React, { useState, useEffect } from 'react'
import { Card, Descriptions, Empty } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { generalSelector } from '../../../../../slices/general'
import axios from 'axios'
import { storeLastDate } from '../../../../../slices/user'
import DeviceTable from '../../../Common/Overview/Identity/DeviceTable'
import CardTable from '../../../Common/Overview/Identity/CardTable'
import AccountTable from '../../../Common/Overview/Identity/AccountTable'

export default () => {
	const { id, exist } = useSelector(generalSelector)
	const [ devices, setDevices ] = useState(null)
	const [ cardOverview, setCardOverview ] = useState(null)
	const [ accountOverview, setAccountOverview ] = useState(null)
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

			const fetchCardOverview = async () => {
				axios
					.post(`http://localhost:8085/api/profile/user/card/overview`, {
						id: id
					})
					.then((response) => {
						setCardOverview(response.data)
					})
					.catch(console.error)
			}

			const fetchAccountOverview = async () => {
				axios
					.post(`http://localhost:8085/api/profile/user/account/overview`, {
						id: id
					})
					.then((response) => {
						setAccountOverview(response.data)
					})
					.catch(console.error)
			}

			// fetchLastOnboardAndTransactionDate()
			fetchDeviceList()
			fetchCardOverview()
			fetchAccountOverview()
		},
		[ id, dispatch ]
	)

	return (
		<Card title="Identity" headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }} hoverable={true}>
			<Descriptions column={1} bordered>
				{/* <Descriptions.Item label="Last Device Onboard">
					{date.lastOnboard ? moment(date.lastOnboard).format('L LTS') : 'Unknown'}
				</Descriptions.Item>
				<Descriptions.Item label="Last Device Transaction">
					{date.lastTransaction ? moment(date.lastTransaction).format('L LTS') : 'Unknown'}
				</Descriptions.Item> */}
				{devices && devices.length > 0 ? (
					<Descriptions.Item label={`Total Devices (${devices.length})`}>
						<DeviceTable data={devices} />
					</Descriptions.Item>
				) : (
					<Descriptions.Item label={`Total Devices (0)`} />
				)}

				{cardOverview && cardOverview.length > 0 ? (
					<Descriptions.Item label={`Total Cards (${cardOverview.length})`}>
						<CardTable id={id} data={cardOverview} />
					</Descriptions.Item>
				) : (
					<Descriptions.Item label={`Total Cards (0)`} />
				)}
				{accountOverview && accountOverview.length > 0 ? (
					<Descriptions.Item label={`Total Accounts (${accountOverview.length})`}>
						<AccountTable id={id} data={accountOverview} />
					</Descriptions.Item>
				) : (
					<Descriptions.Item label={`Total Accounts (0)`} />
				)}
			</Descriptions>
		</Card>
	)
}
