import { UpCircleFilled } from "@ant-design/icons"
import { BackTop, Col, Row } from "antd"
import React from "react"
import { useSelector } from "react-redux"
import { generalSelector } from "../../../../slices"
import Geolocation from "../../Common/Activity/Geolocation/GM"
import Mapping from "../../Common/Activity/Mapping"
import Merchant from "../../Common/Activity/Merchant"
import Monetary from "../../Common/Activity/Monetary"
import Statistics from "../../Common/Activity/Statistics"
import UserBasic from "../../Common/Overview/UserIdentity"

export default function UserActivity() {
    const { id, type, filters } = useSelector(generalSelector)

    return (
        <>
            <Row gutter={[12, 12]}>
                <Col span={24}>
                    <Statistics
                        id={id}
                        filters={filters}
                        queryUrl='http://localhost:8085/api/profile/user/'
                        queryParams={{
                            id: `userid/${id}`,
                            fromDate: filters.range[0],
                            toDate: filters.range[1],
                        }}
                    />
                </Col>
                <Col span={24}>
                    <Row gutter={[12, 0]} className='items-stretch'>
                        <Col span={14}>
                            <Monetary id={id} type={type} filters={filters} />
                        </Col>
                        <Col span={10}>
                            <UserBasic />
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row gutter={[12, 0]}>
                        <Col span={12}>
                            <Merchant id={id} type={type} filters={filters} />
                        </Col>
                        <Col span={12}>
                            <Mapping
                                id={id}
                                filters={filters}
                                queryUrl='http://localhost:8085/api/profile/user/'
                                queryParams={{
                                    id: `userid/${id}`,
                                    fromDate: filters.range[0],
                                    toDate: filters.range[1],
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Geolocation id={id} type={type} filters={filters} />
                </Col>
            </Row>

            <BackTop>
                <UpCircleFilled
                    style={{ fontSize: "30px", color: "#3498db" }}
                />
            </BackTop>
        </>
    )
}
