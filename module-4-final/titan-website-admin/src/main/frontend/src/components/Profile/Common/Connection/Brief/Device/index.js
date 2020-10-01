import React, { useEffect, useState } from 'react'
import { Card, Descriptions, Skeleton } from 'antd'
import moment from 'moment'
import copy from 'copy-to-clipboard'
import { Select } from 'antd'

const { Option } = Select

export default ({ id }) => {
	const [ date, setDate ] = useState(null)
	const [ users, setUsers ] = useState(null)
	const [ device, setDevice ] = useState(null)

	useEffect(
		() => {
			const fetchLastOnboardAndTransactionDate = async () => {
				const lastReqDateResponse = await fetch('http://localhost:8085/api/user_device/test', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						query: `LET last_device_onboard = FIRST((FOR v, e IN 1..1 ANY @id user_device_onboard
								SORT e.timestamp DESC
								LET date = DATE_ISO8601(TO_NUMBER(e.timestamp * 1000))
								RETURN date))
							
							LET last_device_transaction = FIRST((FOR v, e IN 1..1 ANY @id user_device_transaction
								SORT DATE_ISO8601(e.reqDate) DESC
								LET date = DATE_ISO8601(e.reqDate)
								RETURN date))
								
							RETURN {last_device_onboard, last_device_transaction}`,
						bindVars: {
							id: `devices/${id}`
						}
					})
				})
				const lastReqDateData = await lastReqDateResponse.json()
				const { last_device_onboard, last_device_transaction } = lastReqDateData[0]
				setDate({
					lastOnboard: last_device_onboard,
					lastTransaction: last_device_transaction
				})
			}

			const fetchUserList = async () => {
				const userListResponse = await fetch('http://localhost:8085/api/user_device/test', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						query: `FOR v, e IN 1..1 ANY @deviceId user_device_onboard
							COLLECT user = e._from
							RETURN user`,
						bindVars: {
							deviceId: `devices/${id}`
						}
					})
				})
				const userList = await userListResponse.json()
				setUsers(userList)
			}

			const fetchDeviceBasicInfo = async () => {
				const deviceResponse = await fetch('http://localhost:8085/api/user_device/test', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						query: `RETURN KEEP(DOCUMENT(@id), ['os_version', 'os_name', 'device_model', 'hw_device_model'])`,
						bindVars: {
							id: `devices/${id}`
						}
					})
				})
				const data = await deviceResponse.json()
				setDevice(data[0])
			}

			fetchLastOnboardAndTransactionDate()
			fetchUserList()
			fetchDeviceBasicInfo()
		},
		[ id ]
	)

	return date && users && device ? (
		<Card title="Device Brief Info" headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }} hoverable={true}>
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
				<Descriptions.Item label="OS Name" className="text-capitalize">
					{device.os_name}
				</Descriptions.Item>
				<Descriptions.Item label="OS Version">{device.os_version}</Descriptions.Item>
				<Descriptions.Item label="Device Model">{device.hw_device_model}</Descriptions.Item>
			</Descriptions>
		</Card>
	) : (
		<Skeleton active />
	)
}
