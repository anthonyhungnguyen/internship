import { Tabs } from "antd"
import React from "react"
import AbuseScore from "./AbuseScore"
import UserListGraph from "./UserListGraph"

const { TabPane } = Tabs

export default function Tool() {
    return (
        <Tabs tabPosition='right'>
            <TabPane tab='User List Graph' key='userListGraph'>
                <UserListGraph />
            </TabPane>
            <TabPane tab='Abuse Score' key='abuseScore'>
                <AbuseScore />
            </TabPane>
        </Tabs>
    )
}
