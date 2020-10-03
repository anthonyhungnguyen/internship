import React, { useEffect, useState } from 'react'
import { Progress, Skeleton, Tabs } from 'antd'
import { Card, Row, Col, Tooltip } from 'antd'
import { useSelector } from 'react-redux'
import { generalSelector } from '../../../../../slices/general'
import axios from 'axios'

const { TabPane } = Tabs

export default () => {
	const { id } = useSelector(generalSelector)
	const [ hardware, setHardware ] = useState(null)

	useEffect(() => {
		const fetchHardwareScore = async () => {
			axios
				.post('http://localhost:8085/api/profile/device/score/hardware', {
					type: 'devices',
					id: id
				})
				.then((response) => {
					const { score, scoreData } = response.data

					setHardware({
						score: score.toPrecision(2),
						scoreData
					})
				})
				.catch(console.error)
		}
		fetchHardwareScore()
	}, [])

	const renderHardwareScoreDetails = (scoreData) => {
		return (
			<div>
				{scoreData.map((x) => (
					<p>
						<span className="font-bold">{x.field}</span>: {x.score.toPrecision(2)}
					</p>
				))}
			</div>
		)
	}

	return (
		<Card title="Score" headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }} hoverable={true}>
			<Row align="middle">
				<Col span={8}>
					<p className="text-6xl m-0">32.22</p>
					<p className="text-xs text-gray-500 font-bold">FRAUD SCORE</p>
					<Progress percent="33.32" showInfo={false} status="active" size="small" strokeColor="#e74c3c" />
				</Col>
				<Col span={16}>
					<Row gutter={[ 40, 24 ]}>
						{hardware ? (
							<Tooltip placement="topLeft" title={renderHardwareScoreDetails(hardware.scoreData)}>
								<Col span={12} className="gutter-row">
									<p className="text-4xl">{hardware.score}</p>
									<p className="text-xs text-gray-500 font-bold">HARDWARE SCORE (0-30)</p>
									<Progress
										percent={hardware.score / 30 * 100}
										showInfo={false}
										status="active"
										size="small"
										strokeColor={
											hardware.score > 10 ? hardware.score > 19 ? (
												'#e74c3c'
											) : (
												'#f1c40f'
											) : (
												'#2ecc71'
											)
										}
									/>
								</Col>
							</Tooltip>
						) : (
							<Col span={12} className="gutter-row">
								<Skeleton active />
							</Col>
						)}

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
