import React from 'react'
import { BackTop, Row, Skeleton, Col } from 'antd'
import { UpCircleFilled } from '@ant-design/icons'
import { deviceSelector } from '../../../../slices/device'
import { useSelector } from 'react-redux'
import './index.css'
import FilterBar from './FilterBar'
import Frequency from './Frequency'
import Merchant from './Merchant'
import Monetary from './Monetary'
import Geolocation from './Geolocation'

export default React.memo(() => {
	const { loading, hasErrors } = useSelector(deviceSelector)

	return (
		<div className="animated fadeIn">
			<Row gutter={[ 24, 24 ]}>
				<Col span={24}>
					<FilterBar />
				</Col>
			</Row>
			{!loading && !hasErrors ? (
				<React.Fragment>
					<Row gutter={[ 24, 24 ]}>
						<Col span={12}>
							<Frequency />
						</Col>
						<Col span={12}>
							<Merchant />
						</Col>
					</Row>
					<Row gutter={[ 24, 24 ]}>
						<Col span={12}>
							<Monetary />
						</Col>
						<Col span={12}>
							<Geolocation />
						</Col>
					</Row>
				</React.Fragment>
			) : (
				<Skeleton active />
			)}
			<BackTop>
				<UpCircleFilled style={{ fontSize: '30px', color: '#3498db' }} />
			</BackTop>
		</div>
	)
})
