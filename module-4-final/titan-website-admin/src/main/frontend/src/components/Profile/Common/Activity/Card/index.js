import React, { useState } from "react"
import { Tabs, Card } from "antd"
import Overview from "./Overview"
import Bank from "./Bank"
import Timestamp from "./Timestamp"
import "./index.css"

const { TabPane } = Tabs

export default ({ id, type, filters, queryUrl, queryParams }) => {
    const [activeTab, setActiveTab] = useState("overview")

    return (
        <Card
            style={{
                height: "50vh",
            }}
            hoverable={true}
            className='h-full'
            bodyStyle={{ height: "100%" }}
        >
            <Tabs
                defaultActiveKey='card'
                type='card'
                tabBarStyle={{ margin: 0, fontWeight: "bold" }}
                className='h-full'
                tabBarExtraContent={
                    <Tabs
                        defaultActiveKey={activeTab}
                        animated={true}
                        onChange={(e) => setActiveTab(e)}
                        type='line'
                        tabBarStyle={{ margin: 0, fontWeight: "normal" }}
                    >
                        <TabPane tab='Overview' key='overview' />
                        <TabPane tab='Timestamp' key='timestamp' />
                        <TabPane tab='Bank' key='bank' />
                    </Tabs>
                }
            >
                <TabPane tab='Card' key='card'>
                    {activeTab === "overview" && (
                        <Overview
                            id={id}
                            type={type}
                            filters={filters}
                            queryUrl={queryUrl + "card/mapping/overview"}
                            queryParams={queryParams}
                        />
                    )}
                    {activeTab === "timestamp" && (
                        <Timestamp
                            id={id}
                            type={type}
                            filters={filters}
                            queryUrl={queryUrl + "card/mapping/timeline"}
                            queryParams={queryParams}
                        />
                    )}
                    {activeTab === "bank" && (
                        <Bank
                            id={id}
                            type={type}
                            filters={filters}
                            queryUrl={queryUrl + "card/mapping/bank"}
                            queryParams={queryParams}
                        />
                    )}
                </TabPane>
                <TabPane tab='Account' key='account'>
                    {activeTab === "overview" && (
                        <Overview
                            id={id}
                            type={type}
                            filters={filters}
                            queryUrl={queryUrl + "account/mapping/overview"}
                            queryParams={queryParams}
                        />
                    )}
                    {activeTab === "timestamp" && (
                        <Timestamp
                            id={id}
                            type={type}
                            filters={filters}
                            queryUrl={queryUrl + "account/mapping/timeline"}
                            queryParams={queryParams}
                        />
                    )}
                    {activeTab === "bank" && (
                        <Bank
                            id={id}
                            type={type}
                            filters={filters}
                            queryUrl={queryUrl + "account/mapping/bank"}
                            queryParams={queryParams}
                        />
                    )}
                </TabPane>
            </Tabs>
        </Card>
    )
}
