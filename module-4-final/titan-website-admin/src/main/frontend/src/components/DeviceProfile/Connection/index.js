import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Graph from './Graph'
import { deviceSelector } from '../../../slices/device'
import { Row, Col, BackTop } from 'antd'
import DeviceBriefInformation from './DeviceBriefInformation'

export default () => {
	const { deviceId, device } = useSelector(deviceSelector)
	const [ currentChosenDevice, setCurrentChosenDevice ] = useState(deviceId)
	return (
		<React.Fragment>
			<Row gutter={[ 24, 24 ]}>
				<Col span={16}>
					<Graph setCurrentChosenDevice={setCurrentChosenDevice} />
				</Col>
				<Col span={8}>
					<DeviceBriefInformation currentChosenDevice={currentChosenDevice} device={device} />
				</Col>
			</Row>

			<BackTop>
				<div
					style={{
						color: '#fff',
						backgroundColor: '#3498db',
						borderRadius: 4,
						textAlign: 'center',
						lineHeight: '43px',
						fontSize: '20px',
						width: 40,
						height: 40
					}}
				>
					^
				</div>
			</BackTop>
		</React.Fragment>
	)
}
