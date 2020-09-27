import React, { useEffect } from 'react'
import { Row, Col, Skeleton, BackTop } from 'antd'
import { UpCircleFilled } from '@ant-design/icons'
import Card from './Card'
import { useSelector, useDispatch } from 'react-redux'
import { generalSelector } from '../../../../slices/general'
import Monetary from './Monetary'
import Merchant from './Merchant'
import Geolocation from './Geolocation'
import { userSelector } from '../../../../slices/user'

export default () => {
	const { loading, hasErrors } = useSelector(userSelector)

	return (
		<div className="animated fadeIn">
			{/* <Row gutter={[ 24, 24 ]}>
				<Col span={24}>
					<FilterBar />
				</Col>
			</Row> */}
			{!loading && !hasErrors ? (
				<React.Fragment>
					<Row gutter={[ 24, 24 ]}>
						<Col span={12}>
							<Card />
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
}
