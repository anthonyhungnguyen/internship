import React from 'react'
import { Card, Descriptions } from 'antd'
import { useSelector } from 'react-redux'
import { Select } from 'antd'
import { deviceSelector } from '../../../../../slices/device'
import copy from 'copy-to-clipboard'
import { generalSelector } from '../../../../../slices/general'

const { Option } = Select

export default () => {
	const { id } = useSelector(generalSelector)
	const { users } = useSelector(deviceSelector)

	return (
		<Card title="Identity" headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }} hoverable={true}>
			<Descriptions column={1} bordered>
				<Descriptions.Item label="Device ID">{id}</Descriptions.Item>
				<Descriptions.Item label="Total Users">
					{users && (
						<Select defaultValue={users.length} style={{ width: 180 }} onSelect={(e) => copy(e)}>
							{users.map((u) => {
								const userId = u.split('/')[1].trim()
								return (
									<Option value={userId} key={userId}>
										{userId}
									</Option>
								)
							})}
						</Select>
					)}
				</Descriptions.Item>
			</Descriptions>
		</Card>
	)
}
