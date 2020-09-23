import React, { useEffect, useState } from 'react'
import { Descriptions, Card } from 'antd'

export default ({ currentChosenUser }) => {
	const [ userConnections, setUserConnections ] = useState([])
	useEffect(
		() => {
			const fetchTotalUserConnections = async () => {
				if (currentChosenUser !== '') {
					const response = await fetch(
						`http://localhost:8085/api/user_device/user/${currentChosenUser}/connections`
					)
					const data = await response.json()
					setUserConnections(data)
				}
			}
			fetchTotalUserConnections()
		},
		[ currentChosenUser ]
	)
	return (
		<div className="animated fadeIn">
			<Card title="User Brief Info" headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }} hoverable={true}>
				<Descriptions column={1} bordered>
					<Descriptions.Item label="User ID">
						{currentChosenUser ? currentChosenUser : 'None'}
					</Descriptions.Item>
					<Descriptions.Item label="Total User Connections">
						{userConnections.length !== 0 ? userConnections.length : 0}
					</Descriptions.Item>
				</Descriptions>
			</Card>
		</div>
	)
}
