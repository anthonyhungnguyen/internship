import React from "react"
import { BackTop, Row, Skeleton, Col } from "antd"
import { UpCircleFilled } from "@ant-design/icons"
import { deviceSelector } from "../../../../slices/device"
import { useSelector } from "react-redux"
import "./index.css"

import Monetary from "../../Common/Activity/Monetary"
import Geolocation from "../../Common/Activity/Geolocation"
import { generalSelector } from "../../../../slices/general"
import Frequency from "../../Common/Activity/Frequency"
import Merchant from "../../Common/Activity/Merchant"
import Mapping from "../../Common/Activity/Mapping"
import Statistics from "../../Common/Activity/Statistics"
export default React.memo(() => {
    const { loading, hasErrors, filters } = useSelector(deviceSelector)
    const { id, type } = useSelector(generalSelector)
    return (
        <div className='animated fadeIn'>
            {!loading && !hasErrors ? (
                <React.Fragment>
                    <Row gutter={[12, 12]}>
                        <Col span={24}>
                            <Statistics
                                id={id}
                                filters={filters}
                                queryUrl='http://localhost:8085/api/profile/device/'
                                queryParams={{
                                    id: `deviceid/${id}`,
                                    fromDate: filters.range[0],
                                    toDate: filters.range[1],
                                }}
                            />
                        </Col>
                        <Col span={12}>
                            <Row gutter={[12, 12]}>
                                <Col span={24}>
                                    <Frequency
                                        id={id}
                                        type={type}
                                        filters={filters}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={[12, 12]}>
                                <Col span={24}>
                                    <Mapping
                                        id={id}
                                        filters={filters}
                                        queryUrl='http://localhost:8085/api/profile/device/'
                                        queryParams={{
                                            id: `deviceid/${id}`,
                                            fromDate: filters.range[0],
                                            toDate: filters.range[1],
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row gutter={[12, 12]}>
                                <Col span={24}>
                                    <Monetary
                                        id={id}
                                        type={type}
                                        filters={filters}
                                    />
                                </Col>
                            </Row>
                            <Row />
                        </Col>
                        <Col span={12}>
                            <Row gutter={[12, 12]}>
                                <Col span={24}>
                                    <Merchant
                                        id={id}
                                        type={type}
                                        filters={filters}
                                    />
                                </Col>
                            </Row>

                            <Row gutter={[12, 12]}>
                                <Col span={24}>
                                    <Geolocation
                                        id={id}
                                        type={type}
                                        filters={filters}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </React.Fragment>
            ) : (
                <Skeleton active />
            )}
            <BackTop>
                <UpCircleFilled
                    style={{ fontSize: "30px", color: "#3498db" }}
                />
            </BackTop>
        </div>
    )
})
