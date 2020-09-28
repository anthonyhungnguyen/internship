import React, { useState } from 'react';
import { Tabs, Card } from 'antd';
import Overview from './Overview';
import Details from './Details';

const { TabPane } = Tabs;

export default () => {
	const [ activeTab, setActiveTab ] = useState('overview');

	return (
		<Card
			title="Merchant"
			headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
			hoverable={true}
			extra={
				<Tabs defaultActiveKey={activeTab} animated={true} onChange={(e) => setActiveTab(e)} type="line">
					<TabPane tab="Overview" key="overview" />

					<TabPane tab="Details" key="details" />
				</Tabs>
			}
		>
			{activeTab === 'overview' && <Overview />}
			{activeTab === 'details' && <Details />}
		</Card>
	);
};
