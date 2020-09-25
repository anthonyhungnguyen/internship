import React, { useState, Suspense } from 'react'
import { Input, Tabs, Skeleton } from 'antd'
import swal from 'sweetalert'

const { TabPane } = Tabs
const { Search } = Input

export default () => {
	const [ activeTab, setActiveTab ] = useState('overview')

	const handleSearch = (newDeviceId) => {}

	return (
		<Tabs
			defaultActiveKey={activeTab}
			animated={true}
			onChange={(e) => setActiveTab(e)}
			type="card"
			tabBarExtraContent={
				<Search
					addonBefore="User"
					placeholder="input user id"
					onSearch={handleSearch}
					size="large"
					enterButton
				/>
			}
		>
			<TabPane tab="Overview" key="overview">
				<Suspense fallback={<Skeleton active />} />
			</TabPane>
			<TabPane tab="Activity" key="activity">
				<Suspense fallback={<Skeleton active />} />
			</TabPane>
			<TabPane tab="Connection" key="connection">
				<Suspense fallback={<Skeleton active />} />
			</TabPane>
			<TabPane tab="Tool" key="tool">
				<Suspense fallback={<Skeleton active />} />
			</TabPane>
		</Tabs>
	)
}
