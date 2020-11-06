import { UpCircleFilled } from "@ant-design/icons"
import { BackTop, Col, Row } from "antd"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import { generalSelector } from "../../../../slices"
import Graph from "../../Common/Connection/Graph"

export default React.memo(() => {
    const { id, type } = useSelector(generalSelector)
    const [currentChosenId, setCurrentChosenId] = useState(id)
    const [currentType, setCurrentType] = useState(type)

    return (
        <React.Fragment>
            <Row gutter={[24, 24]}>
                <Col span={24}>
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
