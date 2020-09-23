import React from 'react'
import { Card, Descriptions } from 'antd'
import { useSelector } from 'react-redux'
import { Select } from 'antd'
import { deviceSelector } from '../../../../../slices/device'
import copy from 'copy-to-clipboard'

const { Option } = Select

export default () => {
	const { deviceId, device } = useSelector(deviceSelector)

	return (
		<Card title="Identity" headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }} hoverable={true}>
			<Descriptions column={1} bordered>
				<Descriptions.Item label="Device ID">{deviceId}</Descriptions.Item>
				<Descriptions.Item label="Total Users">
					<Select defaultValue={device.users.length} style={{ width: 180 }} onSelect={(e) => copy(e)}>
						{device.users.map((u) => (
							<Option value={u.id} key={u.id}>
								{u.id}
							</Option>
						))}
					</Select>
				</Descriptions.Item>
			</Descriptions>
		</Card>
	)
}
