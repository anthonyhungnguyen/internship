import React from 'react'
import { Input, Card, Button, Row, Col, Form } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { fetchDevice } from '../../../slices/device'

export default () => {
	const dispatch = useDispatch()
	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 8 }
	}
	const tailLayout = {
		wrapperCol: { offset: 8, span: 16 }
	}

	const handleSearchFinish = (values) => {
		dispatch(fetchDevice(values.deviceId))
	}

	return (
		<Card title="Enter Device ID">
			<Form {...layout} onFinish={handleSearchFinish}>
				<Form.Item
					label="Device ID"
					name="deviceId"
					rules={[ { required: true, message: 'Please input Device ID' } ]}
				>
					<Input />
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Button type="primary" icon={<SearchOutlined />} htmlType="submit">
						Search
					</Button>
				</Form.Item>
			</Form>
		</Card>
	)
}
