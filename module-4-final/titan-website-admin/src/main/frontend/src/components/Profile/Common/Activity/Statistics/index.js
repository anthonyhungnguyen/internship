import { Col, Row } from 'antd'
import React from 'react'
import Frequency from './Frequency'
import Geolocation from './Geolocation'
import Mapping from './Mapping'
import Payment from './Payment'

export default () => {
	return (
		<Row gutter={[ 12, 12 ]}>
			<Col span={6}>
				<Frequency />
			</Col>
			<Col span={6}>
				<Payment />
			</Col>
			<Col span={6}>
				<Mapping />
			</Col>
			<Col span={6}>
				<Geolocation />
			</Col>
		</Row>
	)
}
