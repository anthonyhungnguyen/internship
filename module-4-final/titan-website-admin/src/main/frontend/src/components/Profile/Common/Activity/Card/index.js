import React, { useState } from 'react'
import { Tabs, Card } from 'antd'
import Overview from './Overview'
import Bank from './Bank'
import Timestamp from './Timestamp'

const { TabPane } = Tabs

export default ({ id, type, filters, queryUrl, queryParams }) => {
	const [ activeTab, setActiveTab ] = useState('overview')

	return (
		<Card
			title="Card"
			headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
			hoverable={true}
			className="h-full"
			bodyStyle={{ height: '40vh' }}
			extra={
				<Tabs defaultActiveKey={activeTab} animated={true} onChange={(e) => setActiveTab(e)} type="line">
					<TabPane tab="Overview" key="overview" />
					<TabPane tab="Timestamp" key="timestamp" />
					<TabPane tab="Bank" key="bank" />
				</Tabs>
			}
		>
			{activeTab === 'overview' && (
				<Overview
					id={id}
					type={type}
					filters={filters}
					queryUrl={queryUrl + 'overview'}
					queryParams={queryParams}
				/>
			)}
			{activeTab === 'timestamp' && (
				<Timestamp
					id={id}
					type={type}
					filters={filters}
					queryUrl={queryUrl + 'timeline'}
					queryParams={queryParams}
				/>
			)}
			{activeTab === 'bank' && (
				<Bank id={id} type={type} filters={filters} queryUrl={queryUrl + 'bank'} queryParams={queryParams} />
			)}
		</Card>
	)
}
