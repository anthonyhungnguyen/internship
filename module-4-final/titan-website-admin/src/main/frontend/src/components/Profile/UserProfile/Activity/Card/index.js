import React, { useState } from 'react'
import { Tabs, Card } from 'antd'
import Overview from './Overview'
import Bank from './Bank'
import Timestamp from './Timestamp'

const { TabPane } = Tabs

export default () => {
	const [ activeTab, setActiveTab ] = useState('overview')
	return (
		<Card
			title="Card"
			headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
			hoverable={true}
			extra={
				<Tabs defaultActiveKey={activeTab} animated={true} onChange={(e) => setActiveTab(e)} type="line">
					<TabPane tab="Overview" key="overview" />
					<TabPane tab="Timestamp" key="timestamp" />
					<TabPane tab="Bank" key="bank" />
				</Tabs>
			}
		>
			{activeTab === 'overview' && <Overview />}
			{activeTab === 'timestamp' && <Timestamp />}
			{activeTab === 'bank' && <Bank />}
		</Card>
	)
}
