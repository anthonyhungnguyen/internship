import React, { useEffect, useState, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deviceSelector } from '../../../slices/device'
import { Row, Col, BackTop, Skeleton } from 'antd'
import { UpCircleFilled } from '@ant-design/icons'
import { deviceConnectionSelector, fetchConnection } from '../../../slices/deviceConnection'

const Graph = React.lazy(() => import('./Graph'))
const DeviceBriefInformation = React.lazy(() => import('./DeviceBriefInformation'))
const UserBriefInformation = React.lazy(() => import('./UserBriefInformation'))

export default React.memo(() => {
	const dispatch = useDispatch()
	const { deviceId, device } = useSelector(deviceSelector)
	const { loading, hasErrors } = useSelector(deviceConnectionSelector)
	const [ currentChosenDevice, setCurrentChosenDevice ] = useState(deviceId)
	const [ currentChosenUser, setCurrentChosenUser ] = useState('')

	useEffect(
		() => {
			dispatch(fetchConnection(deviceId, 2))
		},
		[ dispatch, deviceId ]
	)

	return !loading && !hasErrors ? (
		<React.Fragment>
			<Row gutter={[ 24, 24 ]}>
				<Col span={16}>
					<Suspense fallback={<Skeleton active />}>
						<Graph
							setCurrentChosenDevice={setCurrentChosenDevice}
							setCurrentChosenUser={setCurrentChosenUser}
							deviceId={deviceId}
						/>
					</Suspense>
				</Col>
				<Col span={8}>
					<Suspense fallback={<Skeleton active />}>
						<DeviceBriefInformation currentChosenDevice={currentChosenDevice} device={device} />
						<UserBriefInformation currentChosenUser={currentChosenUser} />
					</Suspense>
				</Col>
			</Row>

			<BackTop>
				<UpCircleFilled style={{ fontSize: '30px', color: '#3498db' }} />
			</BackTop>
		</React.Fragment>
	) : (
		<Skeleton />
	)
})
