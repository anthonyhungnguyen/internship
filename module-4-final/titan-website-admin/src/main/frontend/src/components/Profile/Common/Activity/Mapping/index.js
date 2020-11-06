import { Card, Tabs } from "antd"
import React, { memo, useState } from "react"
import Bank from "./Bank"
import MappingAccountTable from "./MappingAccountTable"
import MappingCardTable from "./MappingCardTable"
import Overview from "./Overview"
import Timeline from "./Timeline"

const { TabPane } = Tabs

export default memo(function Mapping({
    id,
    type,
    filters,
    queryUrl,
    queryParams,
}) {
    const [OuterActiveTab, setOuterActiveTab] = useState("card")
    const [InnerActiveTab, setInnerActiveTab] = useState("overview")
    return (
        <Card
            hoverable={true}
            className='h-full'
            bodyStyle={{ height: "100%" }}
        >
            <Tabs
                defaultActiveKey='card'
                onChange={(e) => setOuterActiveTab(e)}
                type='card'
                tabBarStyle={{ margin: 0, fontWeight: "bold" }}
                tabBarExtraContent={
                    <Tabs
                        defaultActiveKey={InnerActiveTab}
                        animated={true}
                        onChange={(e) => setInnerActiveTab(e)}
                        type='line'
                        tabBarStyle={{ margin: 0, fontWeight: "normal" }}
                    >
                        <TabPane tab='Overview' key='overview' />
                        <TabPane tab='Timeline' key='timeline' />
                        <TabPane tab='Bank' key='bank' />
                    </Tabs>
                }
            >
                <TabPane tab='Card' key='card'>
                    {InnerActiveTab === "overview" && (
                        <Overview
                            id={id}
                            type={type}
                            filters={filters}
                            queryUrl={queryUrl + "card/mapping/overview"}
                            queryParams={queryParams}
                        />
                    )}
                    {InnerActiveTab === "timeline" && (
                        <Timeline
                            id={id}
                            type={type}
                            filters={filters}
                            queryUrl={queryUrl + "card/mapping/timeline"}
                            queryParams={queryParams}
                        />
                    )}
                    {InnerActiveTab === "bank" && (
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
                    {InnerActiveTab === "overview" && (
                        <Overview
                            id={id}
                            type={type}
                            filters={filters}
                            queryUrl={queryUrl + "account/mapping/overview"}
                            queryParams={queryParams}
                        />
                    )}
                    {InnerActiveTab === "timeline" && (
                        <Timeline
                            id={id}
                            type={type}
                            filters={filters}
                            queryUrl={queryUrl + "account/mapping/timeline"}
                            queryParams={queryParams}
                        />
                    )}
                    {InnerActiveTab === "bank" && (
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

            {OuterActiveTab === "card" ? (
                <MappingCardTable id={id} filters={filters} />
            ) : (
                <MappingAccountTable id={id} filters={filters} />
            )}
        </Card>
    )
})
