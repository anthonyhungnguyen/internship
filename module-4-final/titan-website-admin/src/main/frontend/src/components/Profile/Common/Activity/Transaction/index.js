import { Card, Skeleton, Timeline } from "antd"
import React, { useEffect, useState } from "react"
import moment from "moment"
import Axios from "axios"

export default function Transaction({ id, type, filters }) {
    const [data, setData] = useState(null)

    useEffect(() => {
        Axios.post(
            `http://localhost:8085/api/profile/user/${id}/monetary/timeline`,
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
    console.log(data)

    return data ? (
        <Card
            title='Monetary Timeline'
            headStyle={{ fontWeight: "bold", fontSize: "1.3em" }}
            style={{
                height: "50vh",
            }}
            bodyStyle={{
                height: "100%",
                overflow: "scroll",
            }}
        >
            <Timeline mode='left'>
                {data.map((d) => (
                    <Timeline.Item
                        label={moment(d.reqDate).format("L LTS")}
                        color={d.transStatus === "SUCCESSFUL" ? "green" : "red"}
                    >
                        <p>{d.description}</p>
                        <p>
                            {parseInt(d.amount).toLocaleString("en-EN", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </p>
                        <p>{d.transStatus}</p>
                    </Timeline.Item>
                ))}
            </Timeline>
        </Card>
    ) : (
        <Skeleton active />
    )
}
