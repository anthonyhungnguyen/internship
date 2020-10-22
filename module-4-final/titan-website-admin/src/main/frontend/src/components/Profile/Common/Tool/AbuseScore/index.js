import { Card, Input, Table } from 'antd'
import Axios from 'axios'
import React, { useState } from 'react'
import moment from 'moment'

const { Search } = Input

export default function AbuseScore() {
    const [data, setData] = useState([])

    const columns = [
        {
            title: 'UserID',
            dataIndex: 'userid',
            key: 'userid',
        },
        {
            title: 'Abuse Score',
            dataIndex: 'abuseScore',
            key: 'abuseScore',
            sorter: (a, b) =>
                parseFloat(a.abuseScore) - parseFloat(b.abuseScore),
        },
        {
            title: 'Update Date',
            dataIndex: 'abuseUpdateTime',
            render: (ts) => moment(ts).format('L LTS'),
        },
    ]

    const onSearch = async (data) => {
        await Axios.post(
            'http://localhost:8085/api/profile/user/abuseScore',
            data.split(',').map((x) => `users/${x.trim()}`)
        ).then((response) => {
            setData(response.data)
        })
    }

    return (
        <Card title='Abuse Score'>
            <Search
                placeholder='input search text'
                onSearch={onSearch}
                pagination={false}
                enterButton
            />

            <Table dataSource={data} columns={columns} />
        </Card>
    )
}
