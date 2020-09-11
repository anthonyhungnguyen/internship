import React, { useEffect, useState } from 'react'
import { Card, Skeleton, Descriptions } from 'antd'
import { useSelector } from 'react-redux'
import { deviceActivitySelector } from '../../../../slices/deviceActivity'
import { formatTimestamp } from '../../../../slices/deviceActivity'
import moment from 'moment'
import { deviceSelector } from '../../../../slices/device'
export default ({ currentChosenDevice, device, deviceId }) => {
	const { loading } = useSelector(deviceSelector)
	const { formattedTimestamps } = useSelector(deviceActivitySelector)
	const [ currentDeviceData, setCurrentDeviceData ] = useState(device)
	const [ currentDeviceTimestamps, setCurrentDeviceTimestamps ] = useState(formattedTimestamps)
	useEffect(
		() => {
			const fetchClickedDevice = async () => {
				if (deviceId !== currentDeviceData) {
					const deviceData = await fetch(`http://localhost:8085/api/device/${currentChosenDevice}`)
					const deviceTimestamp = await fetch(
						`http://localhost:8085/api/user_device/device/${currentChosenDevice}/timestamps`
					)
					const data = await deviceData.json()
					const timestamps = await deviceTimestamp.json()
					setCurrentDeviceData(data)
					setCurrentDeviceTimestamps(formatTimestamp(timestamps))
				}
			}
			fetchClickedDevice()
		},
		[ currentChosenDevice ]
	)

	useEffect(
		() => {
			setCurrentDeviceData(device)
			setCurrentDeviceTimestamps(formattedTimestamps)
		},
		[ loading ]
	)

	const handleCalculateTotalActiveTimes = (timestamps) => {
		let total = 0
		timestamps.forEach((t) => (total += t['count']))
		return total
	}

	const { timestamp, id, users, os_name, os_version, hw_device_model } = currentDeviceData

	const deviceBriefInfo = {
		'Recorded At': moment(timestamp).format('L LTS'),
		'Device ID': id,
		'Total Users': users.length,
		'Total Active Times': handleCalculateTotalActiveTimes(currentDeviceTimestamps),
		'OS Name': os_name,
		'OS Version': os_version,
		Device: hw_device_model
	}

	return currentDeviceData ? (
		<div className="animated fadeIn my-2">
			<Card
				title="Device Brief Info"
				headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
				loading={loading}
				hoverable={true}
			>
				<Descriptions column={1} bordered>
					{Object.keys(deviceBriefInfo).map((k, i) => (
						<Descriptions.Item label={k} key={i}>
							{deviceBriefInfo[k]}
						</Descriptions.Item>
					))}
				</Descriptions>
			</Card>
		</div>
	) : (
		<Skeleton active />
	)
}
