import React from 'react'
import { Progress } from 'antd'
import { Card, Row, Col } from 'antd'

export default () => {
	return (
		<Card title="Score">
			<Row gutter={[ 24, 24 ]} align="middle">
				<Col span={8}>
					<p className="text-6xl">32.22</p>
					<p className="text-xs text-gray-500 font-bold">FRAUD SCORE</p>
					<Progress percent="33.32" showInfo={false} status="active" size="small" strokeColor="#e74c3c" />
				</Col>
				<Col span={16}>
					<p className="font-bold">Details Score</p>
					<Row gutter={[ 40, 24 ]}>
						<Col span={12} className="gutter-row">
							<p className="text-4xl">17.8</p>
							<p className="text-xs text-gray-500 font-bold">OS SCORE</p>
							<Progress
								percent="17.8"
								showInfo={false}
								status="active"
								size="small"
								strokeColor="#e74c3c"
							/>
						</Col>
						<Col span={12} className="gutter-row">
							<p className="text-4xl">13.42</p>
							<p className="text-xs  text-gray-500 font-bold">PROXY SCORE</p>
							<Progress
								percent="13.42"
								showInfo={false}
								status="active"
								size="small"
								strokeColor="#e74c3c"
							/>
						</Col>
					</Row>
					<Row gutter={[ 40, 24 ]}>
						<Col span={12} className="gutter-row">
							<p className="text-4xl">52.8</p>
							<p className="text-xs  text-gray-500 font-bold">USER SCORE</p>
							<Progress
								percent="52.8"
								showInfo={false}
								status="active"
								size="small"
								strokeColor="#f1c40f"
							/>
						</Col>
						<Col span={12} className="gutter-row">
							<p className="text-4xl">98.8</p>
							<p className="text-xs  text-gray-500 font-bold">VELOCITY SCORE</p>
							<Progress
								percent="98.8"
								showInfo={false}
								status="active"
								size="small"
								strokeColor="#2ecc71"
							/>
						</Col>
					</Row>
				</Col>
			</Row>
		</Card>
	)
}
