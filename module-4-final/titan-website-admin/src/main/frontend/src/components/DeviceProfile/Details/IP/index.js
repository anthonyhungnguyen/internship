import React from 'react'
import { Row, Col, Card } from 'antd'

export default () => {
	return (
		<Card title="IP Details">
			<Row className="my-2">
				<Col className="font-bold" span={6}>
					IP Address
				</Col>
				<Col span={18}>1.53.255.136 (IPv4)</Col>
			</Row>
			<Row className="my-2">
				<Col className="font-bold" span={6}>
					Location
				</Col>
				<Col span={18}>Unknown</Col>
			</Row>
			<Row className="my-2">
				<Col className="font-bold" span={6}>
					Country
				</Col>
				<Col span={18}>Vietnam (VN)</Col>
			</Row>
			<Row className="my-2">
				<Col className="font-bold" span={6}>
					Latitude & Longitude
				</Col>
				<Col span={18}>10.81420, 106.64680</Col>
			</Row>
			<Row className="my-2">
				<Col className="font-bold" span={6}>
					Tor Relay IP Address
				</Col>
				<Col span={18}>No</Col>
			</Row>
			<Row className="my-2">
				<Col className="font-bold" span={6}>
					VPN IP Address
				</Col>
				<Col span={18}>Not Detected</Col>
			</Row>
			<Row className="my-2">
				<Col className="font-bold" span={6}>
					Proxy IP Address
				</Col>
				<Col span={18}>Not Detected</Col>
			</Row>
			<Row className="my-2">
				<Col className="font-bold" span={6}>
					Hostname
				</Col>
				<Col span={18}>Unknown. Could not resolve hostname.</Col>
			</Row>
		</Card>
	)
}
