import React, { useEffect, useState } from 'react'
import { Progress } from 'antd'
import { Card, Row, Col, Tooltip } from 'antd'
import { useSelector } from 'react-redux'
import { generalSelector } from '../../../../../slices/general'

export default () => {
	const { id } = useSelector(generalSelector)
	const [ hardware, setHardware ] = useState(null)

	useEffect(() => {
		const fetchHardwareScore = async () => {
			const calculateScore = (scoreList) => {
				let score = 0
				const scoreData = []

				const list_weight_1 = [
					'hw_cpu_name',
					'hw_screen_aspect_ratio',
					'hw_screen_class',
					'battery_type',
					'hw_cpu_speed',
					'hw_cpu_core_count',
					'hw_cpu_supported_64_bit_abis',
					'hw_cpu_supported_32_bit_abis',
					'hw_cpu_processor',
					'hw_cpu_supported_abis'
				]
				const list_weight_2 = [ 'hw_board', 'hw_screen_size', 'hw_cpu_min_speed', 'os_version' ]
				const list_weight_3 = [
					'hw_screen_pixel_density',
					'hw_ram_total',
					'hw_storage_total',
					'hw_screen_refresh_rate'
				]
				scoreList.forEach((s) => {
					if (![ 'nan', '', '0.0', '0' ].includes(s['value'])) {
						if (list_weight_1.includes(s['field'])) {
							const fieldScore = 3 * (1 - s['percent'])
							score += fieldScore
							scoreData.push({ field: s['field'], score: fieldScore })
						} else if (list_weight_2.includes(s['field'])) {
							const fieldScore = 2 * (1 - s['percent'])
							score += fieldScore
							scoreData.push({ field: s['field'], score: fieldScore })
						} else if (list_weight_3.includes(s['field'])) {
							const fieldScore = 1 - s['percent']
							score += fieldScore
							scoreData.push({ field: s['field'], score: fieldScore })
						}
					}
				})
				return { score, scoreData }
			}
			const scoreResponse = await fetch('http://localhost:8085/api/user_device/test', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					query: `LET fields = @fields

					LET model = (FOR v, e IN 1..1 ANY @id device_devicemodel RETURN e._to)[0]
					
					LET devices_included = (FOR v, e IN 1..1 INBOUND model device_devicemodel RETURN DOCUMENT(e._from))
					
					LET total_devices = COUNT(devices_included)
					
					LET id_doc = DOCUMENT(@id)
					
					FOR lf in fields
						LET field_count = COUNT(FOR v IN devices_included FILTER v[lf] == id_doc[lf] RETURN v)
						RETURN {field: lf, value: id_doc[lf], percent: field_count/total_devices}
					
					`,
					bindVars: {
						fields: [
							'hw_board',
							'hw_cpu_name',
							'hw_screen_aspect_ratio',
							'hw_screen_class',
							'battery_type',
							'hw_screen_pixel_density',
							'hw_cpu_speed',
							'hw_screen_refresh_rate',
							'hw_cpu_supported_64_bit_abis',
							'hw_cpu_core_count',
							'hw_cpu_supported_32_bit_abis',
							'hw_cpu_processor',
							'hw_screen_size',
							'hw_cpu_supported_abis',
							'hw_ram_total',
							'hw_cpu_min_speed',
							'hw_storage_total',
							'os_version'
						],
						id: `devices/${id}`
					}
				})
			})
			const scorePercent = await scoreResponse.json()
			const { score, scoreData } = calculateScore(scorePercent)
			setHardware({
				score: score.toPrecision(2),
				scoreData
			})
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
						{hardware && (
							<Tooltip placement="topLeft" title={renderHardwareScoreDetails(hardware.scoreData)}>
								<Col span={12} className="gutter-row" onClick={() => console.log('hello')}>
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
