import React, { useEffect } from 'react'
import { Row, Col, Skeleton, BackTop } from 'antd'
import { UpCircleFilled } from '@ant-design/icons'
import Card from './Card'
import { useSelector, useDispatch } from 'react-redux'
import FilterBar from './FilterBar'
import { fetchActivity, userActivitySelector } from '../../../../slices/userActivity'
import { generalSelector } from '../../../../slices/general'
import Monetary from './Monetary'
import Merchant from './Merchant'
import Geolocation from './Geolocation'

export default () => {
	const hasErrors = false
	const { id } = useSelector(generalSelector)
	const { loading, filters } = useSelector(userActivitySelector)
	const dispatch = useDispatch()

	useEffect(
		() => {
			dispatch(fetchActivity(id, filters))
		},
		[ dispatch, id, filters ]
	)

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
