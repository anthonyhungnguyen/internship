import { Statistic, Card, Divider, Row, Col } from 'antd'
import React from 'react'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import ReactEcharts from 'echarts-for-react'
import 'echarts'

export default () => {
	return (
		<Card>
			<Row>
				<Col span={12}>
					<Statistic title="Monetary" value={'41,400'} suffix="VND" />
				</Col>
				<Col span={12} />
			</Row>
			<Divider />
			<Row>
				<Col span={12}>
					<Statistic
						title="Success"
						value={67.28}
						precision={2}
						valueStyle={{ color: '#3f8600' }}
						suffix="%"
					/>
				</Col>
				<Col>
					<Statistic title="Popular type" value={'Supermarket'} valueStyle={{ color: '#cf1322' }} />
				</Col>
			</Row>
		</Card>
	)
}
