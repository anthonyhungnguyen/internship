import { Table } from "antd"
import Axios from "axios"
import React, { memo, useEffect, useState } from "react"

const columns = [
    {
        title: "Bank Name",
        dataIndex: "bankName",
    },
    {
        title: "Card Name",
        dataIndex: "cardName",
    },

    {
        title: "First 6 Card No",
        dataIndex: "first6CardNo",
    },

    {
        title: "Last 4 Card No",
        dataIndex: "last4CardNo",
    },
    {
        title: "Frequency",
        dataIndex: "frequency",
        sorter: (a, b) => parseFloat(a.appid_count) - parseFloat(b.appid_count),
    },
]

export default memo(function MappingCardTable({ id, filters }) {
    const [data, setData] = useState(null)

    useEffect(() => {
        Axios.post(
            `http://localhost:8085/api/profile/user/${id}/mapping/card/table`,
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
            scroll={{ y: 220 }}
        />
    )
})
