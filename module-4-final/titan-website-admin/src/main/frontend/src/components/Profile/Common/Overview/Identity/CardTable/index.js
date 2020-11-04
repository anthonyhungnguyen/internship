import React from "react"
import { Table } from "antd"

const columns = [
    {
        title: "Card ID",
        dataIndex: "cardId",
        key: "cardId",
    },
    {
        title: "Bank",
        dataIndex: "bankName",
        key: "bankName",
    },
    {
        title: "First 6 Card No",
        dataIndex: "first6CardNo",
        key: "first6CardNo",
    },
    {
        title: "Last 4 Card No",
        dataIndex: "last4CardNo",
        key: "last4CardNo",
    },
]

export default function CardTable({ data }) {
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
