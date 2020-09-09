import React from 'react'
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap'

export default () => {
	return (
		<Card>
			<CardHeader>IP Details</CardHeader>
			<CardBody>
				<Row className="my-2">
					<Col className="font-bold" xs={3}>
						IP Address
					</Col>
					<Col xs={9}>1.53.255.136 (IPv4)</Col>
				</Row>
				<Row className="my-2">
					<Col className="font-bold" xs={3}>
						Location
					</Col>
					<Col xs={9}>Unknown</Col>
				</Row>
				<Row className="my-2">
					<Col className="font-bold" xs={3}>
						Country
					</Col>
					<Col xs={9}>Vietnam (VN)</Col>
				</Row>
				<Row className="my-2">
					<Col className="font-bold" xs={3}>
						Latitude & Longitude
					</Col>
					<Col xs={9}>10.81420, 106.64380</Col>
				</Row>
				<Row className="my-2">
					<Col className="font-bold" xs={3}>
						Tor Relay IP Address
					</Col>
					<Col xs={9}>No</Col>
				</Row>
				<Row className="my-2">
					<Col className="font-bold" xs={3}>
						VPN IP Address
					</Col>
					<Col xs={9}>Not Detected</Col>
				</Row>
				<Row className="my-2">
					<Col className="font-bold" xs={3}>
						Proxy IP Address
					</Col>
					<Col xs={9}>Not Detected</Col>
				</Row>
				<Row className="my-2">
					<Col className="font-bold" xs={3}>
						Hostname
					</Col>
					<Col xs={9}>Unknown. Could not resolve hostname.</Col>
				</Row>
			</CardBody>
		</Card>
	)
}
