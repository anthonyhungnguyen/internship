import React, { useEffect, useState } from 'react'
import { Card, Descriptions, Skeleton } from 'antd'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { Select } from 'antd'
import { deviceSelector, storeLastDate } from '../../../../../slices/device'
import copy from 'copy-to-clipboard'
import axios from 'axios'
import { generalSelector } from '../../../../../slices/general'

const { Option } = Select

export default () => {
	const { id } = useSelector(generalSelector)
	const { date } = useSelector(deviceSelector)
	const [ users, setUsers ] = useState(null)
	const dispatch = useDispatch()

	useEffect(
		() => {
			const fetchLastOnboardAndTransactionDate = async () => {
				await axios
					.post(`http://localhost:8085/api/profile/lastOnboardAndLastTransaction`, {
						id: id,
						type: 'devices'
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

			const fetchUserList = async () => {
				await axios
					.post(`http://localhost:8085/api/profile/device/userList`, {
						type: 'devices',
						id: id
					})
					.then((response) => {
						setUsers(response.data)
					})
					.catch((err) => {
						console.log(err)
					})
			}

			fetchLastOnboardAndTransactionDate()
			fetchUserList()
		},
		[ id, dispatch ]
	)

	return users && !date.dateLoading ? (
		<Card title="Identity" headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }} hoverable={true}>
			<Descriptions column={1} bordered>
				<Descriptions.Item label="Device ID">{id}</Descriptions.Item>
				<Descriptions.Item label="Last Device Onboard">
					{date.lastOnboard ? moment(date.lastOnboard).format('L LTS') : 'Unknown'}
				</Descriptions.Item>
				<Descriptions.Item label="Last Device Transaction">
					{date.lastTransaction ? moment(date.lastTransaction).format('L LTS') : 'Unknown'}
				</Descriptions.Item>
				{users.length > 0 ? (
					<Descriptions.Item label={`Total Users (${users.length})`}>
						<Select
							defaultValue={users[0].split('/')[1].trim()}
							style={{ width: 180 }}
							onSelect={(e) => copy(e)}
						>
							{users.map((u) => {
								const userId = u.split('/')[1].trim()
								return (
									<Option value={userId} key={userId}>
										{userId}
									</Option>
								)
							})}
						</Select>
					</Descriptions.Item>
				) : (
					<Descriptions.Item label={`Total Users (0)`} />
				)}
			</Descriptions>
		</Card>
	) : (
		<Skeleton active />
	)
}
