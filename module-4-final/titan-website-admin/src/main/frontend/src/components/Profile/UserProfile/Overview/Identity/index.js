import React from 'react'
import { Card, Descriptions } from 'antd'
import { useSelector } from 'react-redux'
import { Select } from 'antd'
import copy from 'copy-to-clipboard'
import { generalSelector } from '../../../../../slices/general'
import { userSelector } from '../../../../../slices/user'

const { Option } = Select

export default () => {
	const { id } = useSelector(generalSelector)
	const { devices, cards } = useSelector(userSelector)

	return (
		<Card title="Identity" headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }} hoverable={true}>
			<Descriptions column={1} bordered>
				<Descriptions.Item label="Device ID">{id}</Descriptions.Item>
				<Descriptions.Item label="Total Devices">
					{devices && (
						<Select defaultValue={devices.length} style={{ width: 350 }} onSelect={(e) => copy(e)}>
							{devices.map((u) => {
								const id = u.split('/')[1].trim()
								return (
									<Option value={id} key={id}>
										{id}
									</Option>
								)
							})}
						</Select>
					)}
				</Descriptions.Item>
				<Descriptions.Item label="Total Cards/Accounts">
					{cards && (
						<Select defaultValue={cards.length} style={{ width: 180 }} onSelect={(e) => copy(e)}>
							{cards.map((u) => {
								const id = u.split('/')[1].trim()
								return (
									<Option value={id} key={id}>
										{id}
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
