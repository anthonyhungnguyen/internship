import React from 'react'
import { Input, Card, Button, Form } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

export default ({ setCurrentTab, setCurrentDeviceId }) => {
	const layout = {
		labelCol: { span: 0 },
		wrapperCol: { span: 0 }
	}
	const tailLayout = {
		wrapperCol: { offset: 12, span: 12 }
	}

	const tabList = [
		{
			key: 'details',
			tab: 'Details'
		},
		{
			key: 'activity',
			tab: 'Activity'
		},
		{
			key: 'connection',
			tab: 'Connection'
		}
	]

	const handleSearchFinish = (values) => {
		setCurrentDeviceId(values.deviceId)
	}

	return (
		<Card tabList={tabList} onTabChange={(tab) => setCurrentTab(tab)}>
			<Form {...layout} onFinish={handleSearchFinish} layout="inline">
				<Form.Item
					label="Device ID"
					name="deviceId"
					rules={[ { required: true, message: 'Please input Device ID' } ]}
				>
					<Input />
				</Form.Item>
				<Form.Item>
					<Button type="primary" icon={<SearchOutlined />} htmlType="submit">
						Search
					</Button>
				</Form.Item>
			</Form>
		</Card>
	)
}
