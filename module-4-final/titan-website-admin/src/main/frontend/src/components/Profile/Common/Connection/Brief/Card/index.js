import React, { useEffect, useState } from "react"
import { Card, Descriptions, Skeleton } from "antd"
import moment from "moment"
import axios from "axios"
import UserTable from "../../../Overview/Identity/UserTable"

export default function BriefCard({ id }) {
    const [users, setUsers] = useState(null)
    const [card, setCard] = useState(null)

    useEffect(() => {
        const fetchUserList = async () => {
            await axios
                .post(`http://localhost:8085/api/profile/card/userList`, {
                    type: "card_account",
                    id: id,
                })
                .then((response) => {
                    const data = response.data.map((d, k) => ({
                        key: k,
                        userid: d.userid.split("/")[1].trim(),
                        firstseen: moment(d.firstseen).format("L LT"),
                        lastseen: moment(d.lastseen).format("L LT"),
                    }))
                    setUsers(data)
                })
                .catch(console.error)
        }

        const fetchCardBasicInfo = async () => {
            await axios
                .post(`http://localhost:8085/api/profile/mapping/basicInfo`, {
                    type: "card_account",
                    id: id,
                })
                .then((response) => {
                    setCard(response.data[0])
                })
                .catch(console.err)
        }

        fetchUserList()
        fetchCardBasicInfo()
    }, [id])
    return users && card ? (
        <Card
            title='Card Brief Info'
            headStyle={{ fontWeight: "bold", fontSize: "1.3em" }}
            hoverable={true}
        >
            <Descriptions column={1} bordered>
                <Descriptions.Item label='Card ID'>{id}</Descriptions.Item>
                <Descriptions.Item label='Bank Name'>
                    {card.bankname}
                </Descriptions.Item>
                <Descriptions.Item label='Bank Code'>
                    {card.bankCode}
                </Descriptions.Item>
                <Descriptions.Item label='Last Request Date'>
                    {moment(card.reqDate).format("L LTS")}
                </Descriptions.Item>
                <Descriptions.Item label={`Total Users (${users.length})`}>
                    <UserTable data={users} />
                </Descriptions.Item>
            </Descriptions>
        </Card>
    ) : (
        <Skeleton active />
    )
}
