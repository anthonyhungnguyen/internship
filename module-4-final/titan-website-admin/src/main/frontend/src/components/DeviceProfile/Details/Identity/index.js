import React from 'react'
import { Card, Col, Row, Descriptions } from 'antd'
import { useSelector } from 'react-redux'
import { Select } from 'antd'
import { deviceSelector } from '../../../../slices/device'

const { Option } = Select

export default () => {
	const { deviceId, device, loading } = useSelector(deviceSelector)

	return (
		<Card title="Identity" headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }} hoverable={true}>
			<Descriptions column={1} bordered>
				<Descriptions.Item label="Device ID">{deviceId}</Descriptions.Item>
				<Descriptions.Item label="Total Users">
					{!loading && (
						<Select defaultValue={device.users.length} style={{ width: 120 }}>
							{device.users.map((u) => (
								<Option value={u.id} key={u.id}>
									{u.id}
								</Option>
							))}
						</Select>
					)}
				</Descriptions.Item>
			</Descriptions>
		</Card>
	)
}
