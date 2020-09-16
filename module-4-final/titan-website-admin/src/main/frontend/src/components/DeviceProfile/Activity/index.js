import React, { useEffect } from 'react'
import ActivityFrequency from './ActivityFrequency'
import { BackTop, Row, Skeleton, Col } from 'antd'
import { UpCircleFilled } from '@ant-design/icons'
import { deviceSelector } from '../../../slices/device'
import { deviceActivitySelector, fetchActivity } from '../../../slices/deviceActivity'
import { useDispatch, useSelector } from 'react-redux'
import MerchantFrequency from './MerchantFrequency'
import TPESpending from './TPESpending'
import GeolocationActivity from './GeolocationActivity'

export default React.memo(() => {
	const dispatch = useDispatch()
	const { deviceId } = useSelector(deviceSelector)
	const { loading, hasErrors } = useSelector(deviceActivitySelector)

	useEffect(
		() => {
			dispatch(fetchActivity(deviceId))
		},
		[dispatch, deviceId]
	)

	return !loading && !hasErrors ? (
		<div className="animated fadeIn">
			<Row gutter={[24, 24]}>
				<Col span={12}>
					<ActivityFrequency />
				</Col>
				<Col span={12}>
					<MerchantFrequency />
				</Col>
			</Row>
			<Row gutter={[24, 24]}>
				<Col span={12}>
					<TPESpending />
				</Col>
				<Col span={12}>
					<GeolocationActivity />
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
