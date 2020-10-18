import React, { useEffect, useState } from 'react'
import { Card, Descriptions, Skeleton } from 'antd'
import moment from 'moment'
import axios from 'axios'
import copy from 'copy-to-clipboard'
import { Select } from 'antd'
import UserTable from '../../../Overview/Identity/UserTable'

const { Option } = Select

export default ({ id, type }) => {
	const [ users, setUsers ] = useState(null)
	const [ device, setDevice ] = useState(null)

	useEffect(
		() => {
			const fetchUserList = async () => {
				await axios
					.post(`http://localhost:8085/api/profile/device/userList`, {
						type: 'devices',
						id: id
					})
					.then((response) => {
						const data = response.data.map((d, k) => ({
							key: k,
							userid: d.userid.split('/')[1].trim(),
							firstseen: moment(d.firstseen).format('L LT'),
							lastseen: moment(d.lastseen).format('L LT')
						}))
						setUsers(data)
					})
					.catch(console.error)
			}

			const fetchDeviceBasicInfo = async () => {
				await axios
					.post(`http://localhost:8085/api/profile/device/basicInfo`, {
						type: 'devices',
						id: id,
						keepList: [ 'os_version', 'os_name', 'device_model', 'hw_device_model' ]
					})
					.then((response) => {
						setDevice(response.data[0])
					})
					.catch((err) => {
						console.log(err)
					})
			}

			fetchUserList()
			fetchDeviceBasicInfo()
		},
		[ id ]
	)

	return users && device ? (
		<Card title='Device Brief Info' headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }} hoverable={true}>
			<Descriptions column={1} bordered>
				<Descriptions.Item label='Device ID'>{id}</Descriptions.Item>
				{users.length > 0 ? (
					<Descriptions.Item label={`Total Users (${users.length})`}>
						<UserTable id={id} data={users} />
					</Descriptions.Item>
				) : (
					<Descriptions.Item label={`Total Users (0)`} />
				)}
				<Descriptions.Item label='OS Name' className='text-capitalize'>
					{device.os_name}
				</Descriptions.Item>
				<Descriptions.Item label='OS Version'>{device.os_version}</Descriptions.Item>
				<Descriptions.Item label='Device Model'>{device.hw_device_model}</Descriptions.Item>
			</Descriptions>
		</Card>
	) : (
		<Skeleton active />
	)
}
