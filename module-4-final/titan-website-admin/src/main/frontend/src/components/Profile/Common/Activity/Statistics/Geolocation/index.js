import { Statistic, Card, Divider, Row, Col } from "antd"
import React from "react"

export default function Geolocation() {
    return (
        <Card>
            <Statistic title='Geolocation' value={56} suffix='times' />
            <Divider />
            <Row>
                <Col span={12}>
                    <Statistic
                        title='Peak location'
                        value={"VNG Campus"}
                        precision={2}
                        valueStyle={{ color: "#e67e22" }}
                    />
                </Col>
            </Row>
        </Card>
    )
}
