import React from 'react'
import { Tabs } from 'antd'
import UserListGraph from './UserListGraph'
import AbuseScore from './AbuseScore'

const { TabPane } = Tabs

export default () => {
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
