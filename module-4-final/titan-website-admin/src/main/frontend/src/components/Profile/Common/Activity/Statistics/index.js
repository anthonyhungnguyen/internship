import { Col, Row } from 'antd'
import React from 'react'
import Frequency from './Frequency'
import Geolocation from './Geolocation'
import Mapping from './Mapping'
import Payment from './Payment'

export default ({ id, filters, queryUrl, queryParams }) => {
	return (
		<Row gutter={[ 12, 12 ]}>
			<Col span={6}>
				<Frequency
					id={id}
					filters={filters}
					queryUrl={queryUrl + 'monetary/overview/frequency'}
					queryParams={queryParams}
				/>
			</Col>
			<Col span={6}>
				<Payment
					id={id}
					filters={filters}
					queryUrl={queryUrl + 'monetary/overview'}
					queryParams={queryParams}
				/>
			</Col>
			<Col span={6}>
				<Mapping id={id} filters={filters} queryUrl={queryUrl + 'mapping/overview'} queryParams={queryParams} />
			</Col>
			<Col span={6}>
				<Geolocation />
			</Col>
		</Row>
	)
}
