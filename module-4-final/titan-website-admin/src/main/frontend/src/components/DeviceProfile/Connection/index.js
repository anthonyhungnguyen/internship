import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Graph from './Graph'
import { deviceSelector } from '../../../slices/device'
import { Row, Col } from 'antd'
import DeviceBriefInformation from './DeviceBriefInformation'

export default () => {
	const { deviceId, device } = useSelector(deviceSelector)
	const [ currentChosenDevice, setCurrentChosenDevice ] = useState(deviceId)
	return (
		<Row gutter={[ 24, 24 ]}>
			<Col span={16}>
				<Graph setCurrentChosenDevice={setCurrentChosenDevice} />
			</Col>
			<Col span={8}>
				<DeviceBriefInformation currentChosenDevice={currentChosenDevice} device={device} />
			</Col>
		</Row>
	)
}
