import { Table } from "antd"
import Axios from "axios"
import React, { useEffect, useState } from "react"

export default function MerchantTable({ id, filters }) {
    const [data, setData] = useState(null)
    const [columns, setColumns] = useState(null)

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
                setColumns([
                    {
                        title: "App Type",
                        dataIndex: "merchant",
                        filters: [
                            ...new Set(data.map((x) => x.merchant)),
                        ].map((x) => ({ text: x, value: x })),
                        onFilter: (value, record) =>
                            record.merchant.indexOf(value) === 0,
                    },
                    {
                        title: "App Name",
                        dataIndex: "appName",
                        filters: [
                            ...new Set(data.map((x) => x.appName)),
                        ].map((x) => ({ text: x, value: x })),
                        onFilter: (value, record) =>
                            record.appName.indexOf(value) === 0,
                    },
                    {
                        title: "Frequency",
                        dataIndex: "appid_count",
                        sorter: (a, b) =>
                            parseFloat(a.appid_count) -
                            parseFloat(b.appid_count),
                    },
                    {
                        title: "Monetary",
                        dataIndex: "appid_monetary",
                        sorter: (a, b) =>
                            parseFloat(a.appid_monetary) -
                            parseFloat(b.appid_monetary),
                        render: (d) =>
                            parseInt(d).toLocaleString("en-EN", {
                                style: "currency",
                                currency: "VND",
                            }),
                    },
                ])
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
