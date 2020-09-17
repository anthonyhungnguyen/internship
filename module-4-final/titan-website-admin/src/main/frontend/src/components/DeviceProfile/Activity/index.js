import React, { useEffect, Suspense } from 'react'
import { BackTop, Row, Skeleton, Col } from 'antd'
import { UpCircleFilled } from '@ant-design/icons'
import { deviceSelector } from '../../../slices/device'
import { deviceActivitySelector, fetchActivity } from '../../../slices/deviceActivity'
import { useDispatch, useSelector } from 'react-redux'
import './index.css'

const ActivityFrequency = React.lazy(() => import('./ActivityFrequency'))
const MerchantFrequency = React.lazy(() => import('./MerchantFrequency'))
const TPESpending = React.lazy(() => import('./TPESpending'))
const GeolocationActivity = React.lazy(() => import('./GeolocationActivity'))

export default React.memo(() => {
	const dispatch = useDispatch()
	const { deviceId } = useSelector(deviceSelector)
	const { loading, hasErrors } = useSelector(deviceActivitySelector)

	useEffect(
		() => {
			dispatch(fetchActivity(deviceId))
		},
		[ dispatch, deviceId ]
	)

	return !loading && !hasErrors ? (
		<div className="animated fadeIn">
			<Row gutter={[ 24, 24 ]}>
				<Col span={12}>
					<Suspense fallback={<Skeleton active />}>
						<ActivityFrequency />
					</Suspense>
				</Col>
				<Col span={12}>
					<Suspense fallback={<Skeleton active />}>
						<MerchantFrequency />
					</Suspense>
				</Col>
			</Row>
			<Row gutter={[ 24, 24 ]}>
				<Col span={12}>
					<Suspense fallback={<Skeleton active />}>
						<TPESpending />
					</Suspense>
				</Col>
				<Col span={12}>
					<Suspense fallback={<Skeleton active />}>
						<GeolocationActivity />
					</Suspense>
				</Col>
			</Row>
			<BackTop>
				<UpCircleFilled style={{ fontSize: '30px', color: '#3498db' }} />
			</BackTop>
		</div>
	) : (
		<Skeleton active />
	)
})
