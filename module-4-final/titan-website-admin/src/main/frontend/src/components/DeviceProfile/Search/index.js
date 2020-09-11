import React from 'react'
import { Input, Tabs } from 'antd'
import Details from '../Details'
import Activity from '../Activity'
import Connection from '../Connection'

const { TabPane } = Tabs
const { Search } = Input

export default ({ currentDeviceId, setCurrentDeviceId }) => {
	return (
		<Tabs
			defaultActiveKey="1"
			animated={true}
			type="card"
			tabBarExtraContent={
				<Search
					defaultValue={currentDeviceId}
					placeholder="input device id"
					onSearch={(deviceId) => setCurrentDeviceId(deviceId)}
					size="large"
					enterButton
				/>
			}
		>
			<TabPane tab="Details" key="details">
				<Details />
			</TabPane>
			<TabPane tab="Activity" key="activity">
				<Activity />
			</TabPane>
			<TabPane tab="Connection" key="connection">
				<Connection />
			</TabPane>
		</Tabs>
	)
}
