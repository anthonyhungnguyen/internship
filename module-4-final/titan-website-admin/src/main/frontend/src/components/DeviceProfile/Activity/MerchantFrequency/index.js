import React, { useState } from 'react'
import { Tabs, Card } from 'antd'
import GeneralView from './GeneralView'
import DetailsView from './DetailsView'

const { TabPane } = Tabs

export default (() => {

    const [activeTab, setActiveTab] = useState('general')

    return <Tabs defaultActiveKey={activeTab}
        animated={true}
        onChange={(e) => setActiveTab(e)}
        type="line"
        tabPosition="right"
    >
        <TabPane tab="General View" key="general">
            <GeneralView />
        </TabPane>

        <TabPane tab="Details View" key="details">
            <DetailsView />
        </TabPane>

    </Tabs>
})