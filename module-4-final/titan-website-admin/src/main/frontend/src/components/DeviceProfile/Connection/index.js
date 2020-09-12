import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Graph from './Graph'
import { deviceSelector } from '../../../slices/device'
import { Row, Col, BackTop } from 'antd'
import DeviceBriefInformation from './DeviceBriefInformation'
import UserBriefInformation from './UserBriefInformation'
import { UpCircleFilled } from '@ant-design/icons'

export default () => {
	const { deviceId, device } = useSelector(deviceSelector)
	const [ currentChosenDevice, setCurrentChosenDevice ] = useState(deviceId)
	const [ currentChosenUser, setCurrentChosenUser ] = useState('')
	return (
		<React.Fragment>
			<Row gutter={[ 24, 24 ]}>
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
	)
}
