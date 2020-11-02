import React, { useEffect, useState } from "react"
import { Card, Descriptions } from "antd"
import moment from "moment"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { generalSelector } from "../../../../../slices/general"
import UserTable from "../../../Common/Overview/Identity/UserTable"
import CardTable from "../../../Common/Overview/Identity/CardTable"
import AccountTable from "../../../Common/Overview/Identity/AccountTable"

export default function DeviceIdentity() {
    const { id } = useSelector(generalSelector)
    const [users, setUsers] = useState(null)
    const [cardOverview, setCardOverview] = useState(null)
    const [accountOverview, setAccountOverview] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchUserList = async () => {
            axios
                .post(`http://localhost:8085/api/profile/device/userList`, {
                    type: "devices",
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

        const fetchCardOverview = async () => {
            axios
                .post(
                    `http://localhost:8085/api/profile/device/card/overview`,
                    {
                        id: id,
                    }
                )
                .then((response) => {
                    setCardOverview(response.data)
                })
                .catch(console.error)
        }

        const fetchAccountOverview = async () => {
            axios
                .post(
                    `http://localhost:8085/api/profile/device/account/overview`,
                    {
                        id: id,
                    }
                )
                .then((response) => {
                    setAccountOverview(response.data)
                })
                .catch(console.error)
        }

        // fetchLastOnboardAndTransactionDate()
        fetchUserList()
        fetchCardOverview()
        fetchAccountOverview()
    }, [id, dispatch])

    return (
        <Card
            title='Identity'
            headStyle={{ fontWeight: "bold", fontSize: "1.3em" }}
            hoverable={true}
        >
            <Descriptions column={1} bordered>
                {/* <Descriptions.Item label="Last Device Onboard">
					{date.lastOnboard ? moment(date.lastOnboard).format('L LTS') : 'Unknown'}
				</Descriptions.Item>
				<Descriptions.Item label="Last Device Transaction">
					{date.lastTransaction ? moment(date.lastTransaction).format('L LTS') : 'Unknown'}
				</Descriptions.Item> */}
                {users && users.length > 0 ? (
                    <Descriptions.Item label={`Total Users (${users.length})`}>
                        <UserTable id={id} data={users} />
                    </Descriptions.Item>
                ) : (
                    <Descriptions.Item label={`Total Users (0)`} />
                )}
                {cardOverview && cardOverview.length > 0 ? (
                    <Descriptions.Item
                        label={`Total Cards (${cardOverview.length})`}
                    >
                        <CardTable id={id} data={cardOverview} />
                    </Descriptions.Item>
                ) : (
                    <Descriptions.Item label={`Total Cards (0)`} />
                )}
                {accountOverview && accountOverview.length > 0 ? (
                    <Descriptions.Item
                        label={`Total Accounts (${accountOverview.length})`}
                    >
                        <AccountTable id={id} data={accountOverview} />
                    </Descriptions.Item>
                ) : (
                    <Descriptions.Item label={`Total Accounts (0)`} />
                )}
            </Descriptions>
        </Card>
    )
}
