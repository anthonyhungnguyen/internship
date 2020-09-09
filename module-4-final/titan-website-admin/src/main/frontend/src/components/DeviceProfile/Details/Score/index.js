import React from 'react'
import { Row, Col, Card, CardHeader, CardBody, Container } from 'reactstrap'
import { Line } from 'rc-progress'

export default () => {
	return (
		<Row>
			<Col xs={12}>
				<Card>
					<CardHeader>
						<i className="fa fa-align-justify" /> Score
					</CardHeader>
					<CardBody>
						<Row>
							<Col xs={3} className="flex items-center justify-center flex-col">
								<p className="text-6xl">32.22</p>
								<p className="text-xs text-gray-500 font-bold">Fraud Score</p>
								<Line percent="33.32" strokeWidth="1" className="w-2/3 mt-2" strokeColor="#e74c3c" />
							</Col>
							<Col xs={9}>
								<p className="font-bold">Details Score</p>
								<Row>
									<Col>
										<p className="text-4xl">17.8</p>
										<p className="text-xs text-gray-500 font-bold">OS SCORE</p>
										<Line
											percent="17.8"
											strokeWidth="1"
											className="w-2/3 mt-2"
											strokeColor="#e74c3c"
										/>
									</Col>
									<Col>
										<p className="text-4xl">13.42</p>
										<p className="text-xs  text-gray-500 font-bold">PROXY SCORE</p>
										<Line
											percent="13.42"
											strokeWidth="1"
											className="w-2/3 mt-2"
											strokeColor="#e74c3c"
										/>
									</Col>
								</Row>
								<Row>
									<Col>
										<p className="text-4xl">52.8</p>
										<p className="text-xs  text-gray-500 font-bold">USER SCORE</p>
										<Line
											percent="52.8"
											strokeWidth="1"
											className="w-2/3 mt-2"
											strokeColor="#f1c40f"
										/>
									</Col>
									<Col>
										<p className="text-4xl">98.8</p>
										<p className="text-xs  text-gray-500 font-bold">VELOCITY SCORE</p>
										<Line
											percent="98.8"
											strokeWidth="1"
											className="w-2/3 mt-2"
											strokeColor="#2ecc71"
										/>
									</Col>
								</Row>
							</Col>
						</Row>
					</CardBody>
				</Card>
			</Col>
		</Row>
	)
}
