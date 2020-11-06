import { Card, Col, Input, message, Row } from "antd"
import React from "react"

const { Search } = Input

message.config({
    top: 50,
})

export default function FilterBar({ setUserList }) {
    const handlePreprocessUserListSearch = (listRaw) => {
        const preprocessedList = listRaw.split(",").map((x) => x.trim())
        setUserList(preprocessedList)
    }

    return (
        <Card hoverable={true}>
            <p className='font-bold '>Enter User List (seperated by comma)</p>
            <Row justify='space-around'>
                <Col span={24}>
                    <Search
                        placeholder='input search text'
                        onSearch={(value) =>
                            handlePreprocessUserListSearch(value)
                        }
                        enterButton
                        className='w-full'
                    />
                </Col>
            </Row>
        </Card>
    )
}
