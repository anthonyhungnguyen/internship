import React from 'react'
import { Card, Col, Row } from 'antd'
import { useSelector } from 'react-redux'
import { Select } from 'antd'
import { deviceSelector } from '../../../../slices/device'

const { Option } = Select

export default () => {
	const { deviceId, device, loading } = useSelector(deviceSelector)

	return (
		<Card title="Identity">
			<Row className="my-2">
				<Col className="font-bold" span={6}>
					Device ID
				</Col>
				<Col span={18}>{deviceId}</Col>
			</Row>
			<Row className="my-2">
				<Col className="font-bold" span={6}>
					Total Users
				</Col>
				<Col span={18}>
					{!loading && (
						<Select defaultValue={device.users.length} style={{ width: 120 }}>
							{device.users.map((u) => (
								<Option value={u.id} key={u.id}>
									{u.id}
								</Option>
							))}
						</Select>
					)}
				</Col>
			</Row>
		</Card>
	)
}
