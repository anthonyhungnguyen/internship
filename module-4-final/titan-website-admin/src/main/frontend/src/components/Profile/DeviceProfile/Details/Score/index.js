import React from 'react';
import { Progress } from 'antd';
import { Card, Row, Col, Tooltip } from 'antd';
import { deviceSelector } from '../../../../../slices/device';
import { useSelector } from 'react-redux';

export default () => {
	const { score } = useSelector(deviceSelector);
	const {hardware} = score

	const renderHardwareScoreDetails = (scoreData) => {
		return <Card>
			{scoreData.map(x => <p>{x.field}: {x.score}</p>)}
		</Card>
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
						<Tooltip placement="topLeft" title={renderHardwareScoreDetails(score.scoreData)}>
							<Col span={12} className="gutter-row" onClick={() => console.log('hello')}>
								<p className="text-4xl">{hardware.score}</p>
								<p className="text-xs text-gray-500 font-bold">HARDWARE SCORE</p>
								<Progress
									percent={hardware.score / 30 * 100}
									showInfo={false}
									status="active"
									strokeColor={hardware.score > 10 ? hardware.score > 19 ? '#e74c3c' : '#f1c40f' : '#2ecc71'}
								/>
							</Col>
						</Tooltip>

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
	);
};
