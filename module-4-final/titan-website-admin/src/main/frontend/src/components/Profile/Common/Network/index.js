import { Card, Col, Row, Tabs } from "antd"
import React from "react"
import CardNetwork from "./CardNetwork"
import AccountNetwork from "./AccountNetwork"

const { TabPane } = Tabs

export default function Network() {
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
}
