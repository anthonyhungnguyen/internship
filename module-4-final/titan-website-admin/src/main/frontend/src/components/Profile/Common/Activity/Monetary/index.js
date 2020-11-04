import React, { useState } from "react"
import { Card, Tabs } from "antd"
import Overview from "./Overview"
import Timeline from "./Timeline"

const { TabPane } = Tabs

export default React.memo(({ id, type, filters }) => {
    const [activeTab, setActiveTab] = useState("overview")

    return (
        <Card
            title='Monetary'
            headStyle={{ fontWeight: "bold", fontSize: "1.3em" }}
            className='h-full'
            hoverable={true}
            renderer='canvas'
            extra={
                <Tabs
                    defaultActiveKey={activeTab}
                    animated={true}
                    onChange={(e) => setActiveTab(e)}
                    type='card'
                    tabBarStyle={{ margin: 0 }}
                >
                    <TabPane tab='Overview' key='overview' />

                    <TabPane tab='Timeline' key='timeline' />
                </Tabs>
            }
        >
            {activeTab === "overview" && (
                <Overview id={id} type={type} filters={filters} />
            )}
            {activeTab === "timeline" && (
                <Timeline id={id} type={type} filters={filters} />
            )}
        </Card>
    )
})
