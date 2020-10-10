import { Statistic, Card, Divider, Row, Col } from 'antd'
import React from 'react'

export default () => {
	return (
		<Card>
			<Statistic title="Mapping" value={32} suffix="times" />
			<Divider />
			<Row>
				<Col span={12}>
					<Statistic title="Success" value={98} precision={2} valueStyle={{ color: '#3f8600' }} suffix="%" />
				</Col>
				<Col>
					<Statistic title="Popular Bank" value={'MSB'} valueStyle={{ color: '#3498db' }} />
				</Col>
			</Row>
		</Card>
	)
}
