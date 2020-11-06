import { Table, Tag } from "antd"
import Axios from "axios"
import moment from "moment"
import React, { memo, useEffect, useState } from "react"

const columns = [
    {
        title: "ID",
        dataIndex: "transID",
        width: 160,
    },
    {
        title: "Date Time",
        dataIndex: "reqDate",
        width: 120,
        render: (d) => moment(d).format("L LTS"),
    },
    {
        title: "Description",
        dataIndex: "description",
        width: 150,
    },
    {
        title: "Amount",
        dataIndex: "amount",
        width: 120,
        sorter: (a, b) => parseFloat(a.amount) - parseFloat(b.amount),
        render: (d) =>
            parseInt(d).toLocaleString("en-EN", {
                style: "currency",
                currency: "VND",
            }),
    },
    {
        title: "Status",
        dataIndex: "transStatus",
        render: (d) =>
            d === "SUCCESSFUL" ? (
                <Tag color='success'>{d}</Tag>
            ) : (
                <Tag color='error'>{d}</Tag>
            ),
    },
]

export default memo(function Transaction({ id, type, filters }) {
    const [data, setData] = useState(null)

    useEffect(() => {
        Axios.post(`http://localhost:8085/api/profile/user/${id}/transaction`, {
            fromDate: filters.range[0],
            toDate: filters.range[1],
        })
            .then((response) => {
                const data = response.data
                setData(data)
            })
            .catch(console.error)
    }, [id, filters])
    return (
        <Table
            loading={data ? false : true}
            dataSource={data}
            columns={columns}
            scroll={{ y: 330 }}
        />
    )
})
