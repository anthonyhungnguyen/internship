import { Table } from "antd"
import React, { useEffect, useState } from "react"

import Axios from "axios"

const columns = [
    {
        title: "App Type",
        dataIndex: "merchant",
    },
    {
        title: "App Name",
        dataIndex: "appName",
    },
    {
        title: "Frequency",
        dataIndex: "appid_count",
        sorter: (a, b) => parseFloat(a.appid_count) - parseFloat(b.appid_count),
    },
    {
        title: "Monetary",
        dataIndex: "appid_monetary",
        sorter: (a, b) =>
            parseFloat(a.appid_monetary) - parseFloat(b.appid_monetary),
        render: (d) =>
            parseInt(d).toLocaleString("en-EN", {
                style: "currency",
                currency: "VND",
            }),
    },
]

export default function MerchantTable({ id, filters }) {
    const [data, setData] = useState(null)

    useEffect(() => {
        Axios.post(
            `http://localhost:8085/api/profile/user/${id}/merchant/table`,
            {
                fromDate: filters.range[0],
                toDate: filters.range[1],
            }
        )
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
            scroll={{ y: 200 }}
        />
    )
}
