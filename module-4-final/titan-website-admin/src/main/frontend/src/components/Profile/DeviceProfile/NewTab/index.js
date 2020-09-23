import React from 'react'
import { Tabs } from 'antd'

const { TabPane } = Tabs

export default () => {
	return (
		<TabPane key="hello" tab="Hello">
			World
		</TabPane>
	)
}
