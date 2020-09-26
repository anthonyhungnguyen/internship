import React, { useState } from 'react'
import { Tabs, Card } from 'antd'
import Overview from './Overview'
import Bank from './Bank'

const { TabPane } = Tabs

export default () => {
	const [ activeTab, setActiveTab ] = useState('general')
	return (
		<Card
			title="Card"
			headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
			hoverable={true}
			extra={
				<Tabs defaultActiveKey={activeTab} animated={true} onChange={(e) => setActiveTab(e)} type="line">
					<TabPane tab="General" key="general" />

					<TabPane tab="Details" key="details" />
				</Tabs>
			}
		>
			{activeTab === 'general' && <Overview />}
			{activeTab === 'details' && <Bank />}
		</Card>
	)
}
