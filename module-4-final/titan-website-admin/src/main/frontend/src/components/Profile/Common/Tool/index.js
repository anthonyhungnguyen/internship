import React from 'react'
import { Tabs } from 'antd'
import UserListGraph from './UserListGraph'

const { TabPane } = Tabs

export default () => {
	return (
		<Tabs tabPosition="right">
			<TabPane tab="User List Graph" key="userListGraph">
				<UserListGraph />
			</TabPane>
		</Tabs>
	)
}
