import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Skeleton } from 'antd'
import { useSelector } from 'react-redux'
import { deviceActivitySelector } from '../../../../slices/deviceActivity'
import { formatTimestamp } from '../../../../slices/deviceActivity'
export default ({ currentChosenDevice, device, deviceId }) => {
	const { formattedTimestamps } = useSelector(deviceActivitySelector)
	const [ currentDeviceData, setCurrentDeviceData ] = useState(device)
	const [ currentDeviceTimestamps, setCurrentDeviceTimestamps ] = useState(formattedTimestamps)
	useEffect(
		() => {
			const fetchClickedDevice = async () => {
				if (deviceId !== currentDeviceData) {
					const deviceData = await fetch(`http://localhost:8085/api/device/${currentChosenDevice}`)
					const deviceTimestamp = await fetch(
						`http://localhost:8085/api/user_device/${currentChosenDevice}/timestamps`
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

	const handleCalculateTotalActiveTimes = (timestamps) => {
		let total = 0
		timestamps.forEach((t) => (total += t['count']))
		return total
	}

	const { id, users } = currentDeviceData

	return currentDeviceData ? (
		<Card title="Device Brief Info">
			<Row>
				<Col span={12} className="font-bold">
					Device ID
				</Col>
				<Col span={12}>{id}</Col>
			</Row>
			<Row>
				<Col span={12} className="font-bold">
					Total Users
				</Col>
				<Col span={12}>{users.length}</Col>
			</Row>
			<Row>
				<Col span={12} className="font-bold">
					Total Active Days
				</Col>
				<Col span={12}>{currentDeviceTimestamps.length}</Col>
			</Row>
			<Row>
				<Col span={12} className="font-bold">
					Total Active Times
				</Col>
				<Col span={12}>{handleCalculateTotalActiveTimes(currentDeviceTimestamps)}</Col>
			</Row>
		</Card>
	) : (
		<Skeleton active />
	)
}
