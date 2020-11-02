import React, { useEffect, useState } from "react"
import { Card, Skeleton, Empty } from "antd"
import axios from "axios"
import IPTable from "./IPTable"
import { generalSelector } from "../../../../../slices/general"
import { useSelector } from "react-redux"
import { Select } from "antd"

const { Option } = Select

export default function IP() {
    const [ipList, setIPList] = useState(null)
    const [selectedIP, setSelectedIP] = useState(null)
    const { id, type } = useSelector(generalSelector)
    useEffect(() => {
        axios
            .post("http://localhost:8085/api/profile/ip", {
                type: type,
                id: id,
            })
            .then((response) => {
                console.log(response.data)
                if (response.data.length > 0) {
                    setIPList(response.data)
                    setSelectedIP(response.data[0])
                } else {
                    setIPList([])
                }
            })
            .catch(console.error)
    }, [id, type])

    const handleIPSelect = (value) => {
        console.log(value)
        setSelectedIP(value)
    }
    return ipList ? (
        selectedIP ? (
            <Card
                title='IP Details'
                headStyle={{ fontWeight: "bold", fontSize: "1.3em" }}
                hoverable={true}
                extra={
                    <Select
                        defaultValue={selectedIP}
                        style={{ width: 120 }}
                        onChange={handleIPSelect}
                    >
                        {ipList.map((ip, i) => (
                            <Option value={ip} key={i}>
                                {ip}
                            </Option>
                        ))}
                    </Select>
                }
            >
                <IPTable ip={selectedIP} />
            </Card>
        ) : (
            <Empty />
        )
    ) : (
        <Skeleton active />
    )
}
