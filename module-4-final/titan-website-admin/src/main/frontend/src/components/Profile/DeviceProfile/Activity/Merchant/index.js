import React, { useState } from 'react'
import { Tabs, Card } from 'antd'
import GeneralView from './GeneralView'
import DetailsView from './DetailsView'

const { TabPane } = Tabs

export default () => {
	const [ activeTab, setActiveTab ] = useState('general')

	return (
		<Card
			title="Merchant"
			headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
			hoverable={true}
			extra={
				<Tabs defaultActiveKey={activeTab} animated={true} onChange={(e) => setActiveTab(e)} type="line">
					<TabPane tab="General" key="general" />

					<TabPane tab="Details" key="details" />
				</Tabs>
			}
		>
			{activeTab === 'general' && <GeneralView />}
			{activeTab === 'details' && <DetailsView />}
		</Card>
	)
}
