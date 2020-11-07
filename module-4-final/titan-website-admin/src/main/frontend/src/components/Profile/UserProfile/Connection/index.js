import { UpCircleFilled } from "@ant-design/icons"
import { BackTop, Col, Row } from "antd"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import { generalSelector } from "../../../../slices"
import Graph from "../../Common/Connection/Graph"
import UserBasic from "../../Common/Overview/UserIdentity"

export default React.memo(() => {
    const { id, type } = useSelector(generalSelector)
    const [currentChosenId, setCurrentChosenId] = useState(id)
    const [currentType, setCurrentType] = useState(type)

    return (
        <React.Fragment>
            <Row gutter={[12, 12]} className='items-stretch'>
                <Col span={8}>
                    <UserBasic id={currentChosenId} />
                </Col>
                <Col span={16}>
                    <Graph
                        setCurrentType={setCurrentType}
                        setCurrentChosenId={setCurrentChosenId}
                        id={id}
                        type={type}
                    />
                </Col>
            </Row>

            <BackTop>
                <UpCircleFilled
                    style={{ fontSize: "30px", color: "#3498db" }}
                />
            </BackTop>
        </React.Fragment>
    )
})
