import { Card, Tabs } from "antd"
import React, { memo, useState } from "react"
import Details from "./Details"
import MerchantTable from "./MerchantTable"
import Overview from "./Overview"

const { TabPane } = Tabs

export default memo(function Merchant({ id, type, filters }) {
    const [activeTab, setActiveTab] = useState("overview")
    return (
        <Card
            title='Merchant'
            headStyle={{ fontWeight: "bold", fontSize: "1.3em" }}
            className='h-full'
            bodyStyle={{ height: "100%" }}
            hoverable={true}
            extra={
                <Tabs
                    defaultActiveKey={activeTab}
                    animated={true}
                    onChange={(e) => setActiveTab(e)}
                    type='card'
                    tabBarStyle={{ margin: 0 }}
                >
                    <TabPane tab='Overview' key='overview' />

                    <TabPane tab='Details' key='details' />
                </Tabs>
            }
        >
            {activeTab === "overview" && (
                <Overview id={id} type={type} filters={filters} />
            )}
            {activeTab === "details" && (
                <Details id={id} type={type} filters={filters} />
            )}
            <MerchantTable id={id} type={type} filters={filters} />
        </Card>
    )
})
