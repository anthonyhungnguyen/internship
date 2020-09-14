import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Graph from './Graph'
import { deviceSelector } from '../../../slices/device'
import { Row, Col, BackTop, Skeleton } from 'antd'
import DeviceBriefInformation from './DeviceBriefInformation'
import UserBriefInformation from './UserBriefInformation'
import { UpCircleFilled } from '@ant-design/icons'
import { deviceConnectionSelector, fetchConnection } from '../../../slices/deviceConnection'

export default React.memo(() => {
	const dispatch = useDispatch()
	const { deviceId, device } = useSelector(deviceSelector)
	const { loading, hasErrors } = useSelector(deviceConnectionSelector)
	const [currentChosenDevice, setCurrentChosenDevice] = useState(deviceId)
	const [currentChosenUser, setCurrentChosenUser] = useState('')

	useEffect(
		() => {
			dispatch(fetchConnection(deviceId))
		},
		[dispatch, deviceId]
	)

	return !loading && !hasErrors ? (
		<React.Fragment>
			<Row gutter={[24, 24]}>
				<Col span={16}>
					<Graph
						setCurrentChosenDevice={setCurrentChosenDevice}
						setCurrentChosenUser={setCurrentChosenUser}
					/>
				</Col>
				<Col span={8}>
					<DeviceBriefInformation currentChosenDevice={currentChosenDevice} device={device} />
					<UserBriefInformation currentChosenUser={currentChosenUser} />
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
