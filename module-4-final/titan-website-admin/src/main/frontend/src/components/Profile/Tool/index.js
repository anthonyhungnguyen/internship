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
			<TabPane tab="Tab 2" key="2">
				Content of Tab 2
			</TabPane>
			<TabPane tab="Tab 3" key="3">
				Content of Tab 3
			</TabPane>
		</Tabs>
	)
}
