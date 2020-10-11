import { Statistic, Card, Divider, Row, Col, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import ReactEcharts from 'echarts-for-react'
import axios from 'axios'

export default ({ id, filters, queryUrl, queryParams }) => {
	const [ monetaryFrequencyOverview, setMonetaryFrequencyOverview ] = useState(null)

	useEffect(
		() => {
			axios
				.post(queryUrl, {...queryParams, id: `users/${id}`})
				.then((response) => setMonetaryFrequencyOverview(response.data))
				.catch(console.error)
		},
		[ id, filters ]
	)

	return monetaryFrequencyOverview ? (
		<Card>
			<Row>
				<Col span={12}>
					<Statistic title="Frequency" value={monetaryFrequencyOverview['sumFrequency'] ?? 0} suffix="times" />
				</Col>
				<Col span={12}>
					<ReactEcharts
						theme="walden"
						style={{ height: '100%', width: '100%' }}
						option={{
							tooltip: {},
							xAxis: {
								type: 'category',
								show: false,
								data: monetaryFrequencyOverview['graphData'].map(x => x['date'])
							},
							yAxis: {
								type: 'value',
								show: false
							},
							series: [
								{
									data: monetaryFrequencyOverview['graphData'].map(x => x['frequency']),
									type: 'bar',
									backgroundStyle: {
										color: 'rgba(220, 220, 220, 0.8)'
									}
								}
							]
						}}
					/>
				</Col>
			</Row>
			<Divider />
			<Row>
				<Col span={12}>
					<Statistic title="Peak date" value={monetaryFrequencyOverview['peakDate'] ?? 'Unknown'} precision={2} valueStyle={{ color: '#e67e22' }} />
				</Col>
				<Col>
					<Statistic title="Recency" value={monetaryFrequencyOverview['lastDate'] ?? 'Unknown'} valueStyle={{ color: '#34495e' }} />
				</Col>
			</Row>
		</Card>
	) : (
		<Skeleton active />
	)
}
