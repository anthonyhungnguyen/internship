import { Card, Col, Row } from "antd"
import React, { memo } from "react"
import AccountNetwork from "./AccountNetwork"
import CardNetwork from "./CardNetwork"

export default memo(function Network() {
    return (
        <Card>
            <Row>
                <Col span={12}>
                    <CardNetwork />
                </Col>
                <Col span={12}>
                    <AccountNetwork />
                </Col>
            </Row>
        </Card>
    )
})
