import React, { useEffect, useState } from 'react'
import { Card, Tabs } from 'antd'
import CardNetwork from './CardNetwork'
import AccountNetwork from './AccountNetwork'
import Test from './Test'

const { TabPane } = Tabs

export default function Network() {
    const [activeTab, setActiveTab] = useState('card')
    return (
        <Card
            title='Network'
            style={{ height: '80vh', overflow: 'scroll' }}
            extra={
                <Tabs
                    defaultActiveKey={activeTab}
                    animated={true}
                    onChange={(e) => setActiveTab(e)}
                    type='card'
                    tabBarStyle={{ margin: 0 }}
                >
                    <TabPane tab='Card' key='card' />

                    <TabPane tab='Account' key='account' />
                </Tabs>
            }
        >
            {activeTab == 'card' && <CardNetwork />}
            {activeTab == 'account' && <AccountNetwork />}
        </Card>
    )
}
