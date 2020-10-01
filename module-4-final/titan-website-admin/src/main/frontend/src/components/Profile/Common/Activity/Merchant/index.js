import React, { useState } from 'react'
import { Tabs, Card } from 'antd'
import Overview from './Overview'
import Details from './Details'

const { TabPane } = Tabs

export default ({ id, filters }) => {
	const [ activeTab, setActiveTab ] = useState('overview')
	return (
		<Card
			title="Merchant"
			headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
			hoverable={true}
			bodyStyle={{ height: '45vh' }}
			extra={
				<Tabs defaultActiveKey={activeTab} animated={true} onChange={(e) => setActiveTab(e)} type="line">
					<TabPane tab="Overview" key="overview" />

					<TabPane tab="Details" key="details" />
				</Tabs>
			}
		>
			{activeTab === 'overview' && <Overview id={id} filters={filters} />}
			{activeTab === 'details' && <Details id={id} filters={filters} />}
		</Card>
	)
}
