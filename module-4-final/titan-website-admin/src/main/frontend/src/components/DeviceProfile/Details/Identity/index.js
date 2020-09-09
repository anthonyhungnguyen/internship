import React from 'react'
import { Card, CardHeader, CardBody, Col, Row } from 'reactstrap'
import { useSelector } from 'react-redux'
import { Select } from 'antd'
import { deviceSelector } from '../../../../slices/device'

const { Option } = Select

export default () => {
	const { deviceId, device, loading } = useSelector(deviceSelector)

	return (
		<Card>
			<CardHeader>Identity</CardHeader>
			<CardBody>
				<Row className="my-2">
					<Col className="font-bold" xs={3}>
						Device ID
					</Col>
					<Col xs={9}>{deviceId}</Col>
				</Row>
				<Row className="my-2">
					<Col className="font-bold" xs={3}>
						Total Users
					</Col>
					<Col>
						{!loading && (
							<Select defaultValue={device.users.length} style={{ width: 120 }}>
								{device.users.map((u) => <Option value={u.id}>{u.id}</Option>)}
							</Select>
						)}
					</Col>
				</Row>
			</CardBody>
		</Card>
	)
}
