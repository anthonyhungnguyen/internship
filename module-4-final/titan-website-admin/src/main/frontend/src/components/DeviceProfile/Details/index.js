import React from 'react'
import { Row, Col, Skeleton, BackTop, Descriptions, Badge } from 'antd'
import Score from './Score'
import System from './System'
import Identity from './Identity'
import IP from './IP'
import { useSelector } from 'react-redux'
import { deviceSelector } from '../../../slices/device'

export default () => {
	const { loading } = useSelector(deviceSelector)
	return !loading ? (
		<div className="animated fadeIn text-gray-700">
			<Row gutter={[ 24, 24 ]}>
				<Col span={24}>
					<Score />
				</Col>
			</Row>
			<Row gutter={[ 24, 24 ]}>
				<Col span={12}>
					<System />
				</Col>

				<Col span={12}>
					<Row gutter={[ 24, 24 ]}>
						<Col span={24}>
							<Identity />
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<IP />
						</Col>
					</Row>
				</Col>
			</Row>

			<BackTop>
				<div
					style={{
						color: '#fff',
						backgroundColor: '#3498db',
						borderRadius: 4,
						textAlign: 'center',
						lineHeight: '43px',
						fontSize: '20px',
						width: 40,
						height: 40
					}}
				>
					^
				</div>
			</BackTop>
		</div>
	) : (
		<Skeleton active />
	)
}
