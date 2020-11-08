import { Table } from "antd"
import Axios from "axios"
import React, { memo, useEffect, useState } from "react"

export default memo(function MappingAccountTable({ id, type, filters }) {
    const [data, setData] = useState(null)
    const [columns, setColumns] = useState(null)

    useEffect(() => {
        Axios.post(
            `http://localhost:8085/api/profile/user/${id}/mapping/account/table`,
            {
                fromDate: filters.range[0],
                toDate: filters.range[1],
            }
        )
            .then((response) => {
                const data = response.data
                setColumns([
                    {
                        title: "Bank Name",
                        dataIndex: "bankName",
                        filters: [
                            ...new Set(data.map((x) => x.bankName)),
                        ].map((x) => ({ text: x, value: x })),
                        onFilter: (value, record) =>
                            record.bankName.indexOf(value) === 0,
                    },

                    {
                        title: "First Account No",
                        dataIndex: "firstAccountNo",
                        filters: [...new Set(data.map((x) => x.firstAccountNo))]
                            .sort((a, b) => a - b)
                            .map((x) => ({ text: x, value: x })),
                        onFilter: (value, record) =>
                            record.firstAccountNo.indexOf(value) === 0,
                    },

                    {
                        title: "Last Account No",
                        dataIndex: "lastAccountNo",
                        filters: [...new Set(data.map((x) => x.lastAccountNo))]
                            .sort((a, b) => a - b)
                            .map((x) => ({ text: x, value: x })),
                        onFilter: (value, record) =>
                            record.lastAccountNo.indexOf(value) === 0,
                    },
                    {
                        title: "Frequency",
                        dataIndex: "frequency",
                        sorter: (a, b) =>
                            parseFloat(a.frequency) - parseFloat(b.frequency),
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
            scroll={{ y: 220 }}
        />
    )
})
