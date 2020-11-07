import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons"
import { Card, Col, Image, Row, Skeleton } from "antd"
import axios from "axios"
import React, { memo, useEffect, useState } from "react"
export default memo(function UserBasic({ id }) {
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
            className='h-full'
        >
            {Object.keys(info).map((k, i) => (
                <Row key={i} gutter={[24, 24]}>
                    <Col span={12} className='font-bold text-base'>
                        {k}
                    </Col>
                    <Col span={12} className='break-words'>
                        {info[k]}
                    </Col>
                </Row>
            ))}
        </Card>
    ) : (
        <Skeleton />
    )
})
