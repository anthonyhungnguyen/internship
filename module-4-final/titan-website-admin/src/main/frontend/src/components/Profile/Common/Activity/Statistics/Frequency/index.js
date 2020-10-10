import { Statistic, Card, Divider, Row, Col } from 'antd'
import React from 'react'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'

export default () => {
	return (
		<Card>
			<Statistic title="Frequency" value={56} suffix="times" />
			<Divider />
			<Row>
				<Col span={12}>
					<Statistic title="Peak date" value={'18-08-2020'} precision={2} valueStyle={{ color: '#e67e22' }} />
				</Col>
				<Col>
					<Statistic title="Last date" value={'02-09-2020'} valueStyle={{ color: '#34495e' }} />
				</Col>
			</Row>
		</Card>
	)
}
