import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { deviceSelector, fetchConnection } from "../../../../slices/device"
import { Row, Col, BackTop, Skeleton } from "antd"
import { UpCircleFilled } from "@ant-design/icons"
import { generalSelector } from "../../../../slices/general"
import Graph from "../../Common/Connection/Graph"

export default React.memo(() => {
    const dispatch = useDispatch()
    const { id, type } = useSelector(generalSelector)
    const { loading, hasErrors, graphData } = useSelector(deviceSelector)
    const [currentChosenId, setCurrentChosenId] = useState(id)
    const [currentType, setCurrentType] = useState(type)

    useEffect(() => {
        dispatch(fetchConnection(id, 1))
    }, [dispatch, id])

    return !loading && !hasErrors ? (
        <React.Fragment>
            <Row gutter={[12, 12]}>
                <Col span={24}>
                    <Graph
                        setCurrentType={setCurrentType}
                        setCurrentChosenId={setCurrentChosenId}
                        id={id}
                        type={type}
                        graphData={graphData}
                    />
                </Col>
            </Row>

            <BackTop>
                <UpCircleFilled
                    style={{ fontSize: "30px", color: "#3498db" }}
                />
            </BackTop>
        </React.Fragment>
    ) : (
        <Skeleton active />
    )
})
