import React, { useEffect, useState } from "react"
import { Card, Descriptions, Skeleton, Image } from "antd"
import axios from "axios"
import { generalSelector } from "../../../../../slices/general"
import { useSelector } from "react-redux"
import DescriptionsItem from "antd/lib/descriptions/Item"
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons"
export default function UserBasic() {
    const { id } = useSelector(generalSelector)
    const [info, setInfo] = useState(null)
    useEffect(() => {
        axios
            .post("http://localhost:8085/api/profile/user/info", {
                id: `userid/${id}`,
            })
            .then((response) => {
                const data = response.data
                setInfo({
                    Avatar: <Image src={data["avatar"]} />,
                    "Display Name": data["displayname"],
                    Birthday: data["birthdate"],
                    Gender: data["usergender"],
                    "Is Locked": data["islocked"] ? (
                        <CheckCircleTwoTone twoToneColor='#52c41a' />
                    ) : (
                        <CloseCircleTwoTone twoToneColor='#e74c3c' />
                    ),
                    "Profile Level": data["profilelevel"],
                    "Acquital Result": data["acquital_result"] ? (
                        <CheckCircleTwoTone twoToneColor='#52c41a' />
                    ) : (
                        <CloseCircleTwoTone twoToneColor='#e74c3c' />
                    ),
                    "Postmoterm Add Date": data["postmortem_add_date"],
                    "Postmoterm Result": data["postmortem_result"],
                    "KYC DOB": data["kycdob"],
                    "KYC Fullname": data["kycfullname"],
                    "KYC Gender": data["kycgender"],
                    "Phone Number": data["phonenumber"],
                    "Zalo ID": data["zaloid"],
                })
            })
            .catch(console.err)
    }, [id])

    return info ? (
        <Card
            title='Identity'
            headStyle={{ fontWeight: "bold", fontSize: "1.3em" }}
            hoverable={true}
        >
            <Descriptions column={1} bordered>
                {/* {Object.keys(info).map((k, i) => (
                    <DescriptionsItem label={k} key={i}>
                        {info[k]}
                    </DescriptionsItem>
                ))} */}
                <DescriptionsItem label='Avatar'>
                    <img src='https://via.placeholder.com/150' />
                </DescriptionsItem>
                <DescriptionsItem label='Birthday'>UNKNOWN</DescriptionsItem>
                <DescriptionsItem label='Gender'>UNKNOWN</DescriptionsItem>
                <DescriptionsItem label='Is Locked'>
                    <CloseCircleTwoTone twoToneColor='#e74c3c' />
                </DescriptionsItem>
                <DescriptionsItem label='KYC DOB'>UNKNOWN</DescriptionsItem>
                <DescriptionsItem label='KYC Fullname'>
                    UNKNOWN
                </DescriptionsItem>
                <DescriptionsItem label='KYC Gender'>UNKNOWN</DescriptionsItem>
                <DescriptionsItem label='KYC Phonenumber'>
                    UNKNOWN
                </DescriptionsItem>
                <DescriptionsItem label='Postmoterm Add Date'>
                    UNKNOWN
                </DescriptionsItem>
                <DescriptionsItem label='Postmoterm Result'>
                    UNKNOWN
                </DescriptionsItem>
                <DescriptionsItem label='Profile Level'>
                    UNKNOWN
                </DescriptionsItem>
            </Descriptions>
        </Card>
    ) : (
        <Skeleton />
    )
}
