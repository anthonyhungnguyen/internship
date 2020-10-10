import React, { useState } from 'react'
import { Tabs, Card } from 'antd'
import Overview from './Overview'
import Details from './Details'
import './index.css'

const { TabPane } = Tabs

export default ({ id, type, filters }) => {
	const [ activeTab, setActiveTab ] = useState('overview')
	return (
		<Card
			title="Merchant"
			headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
			hoverable={true}
			style={{
				height: '50vh'
			}}
			bodyStyle={{ height: '100%' }}
			extra={
				<Tabs
					defaultActiveKey={activeTab}
					animated={true}
					onChange={(e) => setActiveTab(e)}
					type="card"
					tabBarStyle={{ margin: 0 }}
				>
					<TabPane tab="Overview" key="overview" />

					<TabPane tab="Details" key="details" />
				</Tabs>
			}
		>
			{activeTab === 'overview' && <Overview id={id} type={type} filters={filters} />}
			{activeTab === 'details' && <Details id={id} type={type} filters={filters} />}
		</Card>
	)
}
