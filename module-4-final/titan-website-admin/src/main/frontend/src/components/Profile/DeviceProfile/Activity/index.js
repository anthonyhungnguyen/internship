import React, { useEffect, Suspense } from 'react'
import { BackTop, Row, Skeleton, Col } from 'antd'
import { UpCircleFilled } from '@ant-design/icons'
import { deviceSelector } from '../../../../slices/device'
import { deviceActivitySelector, fetchActivity } from '../../../../slices/deviceActivity'
import { useDispatch, useSelector } from 'react-redux'
import './index.css'
import FilterBar from './FilterBar'

const Frequency = React.lazy(() => import('./Frequency'))
const Merchant = React.lazy(() => import('./Merchant'))
const Monetary = React.lazy(() => import('./Monetary'))
const Geolocation = React.lazy(() => import('./Geolocation'))

export default React.memo(() => {
	const dispatch = useDispatch()
	const { deviceId, hasErrors } = useSelector(deviceSelector)
	const { loading, filters } = useSelector(deviceActivitySelector)

	useEffect(
		() => {
			dispatch(fetchActivity(deviceId, filters))
		},
		[ dispatch, deviceId, filters ]
	)

	return (
		<div className="animated fadeIn">
			<Row gutter={[ 24, 24 ]}>
				<Col span={24}>
					<Suspense fallback={<Skeleton active />}>
						<FilterBar />
					</Suspense>
				</Col>
			</Row>
			{!loading && !hasErrors ? (
				<React.Fragment>
					<Row gutter={[ 24, 24 ]}>
						<Col span={12}>
							<Suspense fallback={<Skeleton active />}>
								<Frequency />
							</Suspense>
						</Col>
						<Col span={12}>
							<Suspense fallback={<Skeleton active />}>
								<Merchant />
							</Suspense>
						</Col>
					</Row>
					<Row gutter={[ 24, 24 ]}>
						<Col span={12}>
							<Suspense fallback={<Skeleton active />}>
								<Monetary />
							</Suspense>
						</Col>
						<Col span={12}>
							<Suspense fallback={<Skeleton active />}>
								<Geolocation />
							</Suspense>
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
