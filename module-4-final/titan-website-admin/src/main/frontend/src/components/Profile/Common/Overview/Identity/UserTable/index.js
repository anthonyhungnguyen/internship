import React from "react"
import { Table } from "antd"
import moment from "moment"

const columns = [
    {
        title: "User ID",
        dataIndex: "userid",
        key: "userid",
    },
]

export default function UserTable({ data }) {
    return (
        <Table
            columns={columns}
            dataSource={data}
            loading={data ? false : true}
            scroll={{ y: 240 }}
            pagination={false}
        />
    )
}
