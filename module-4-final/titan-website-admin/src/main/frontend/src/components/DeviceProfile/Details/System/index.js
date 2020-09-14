import React from 'react'
import { Card } from 'antd'
import { useSelector } from 'react-redux'
import Android from './Android'
import Ios from './Ios'
import { deviceSelector } from '../../../../slices/device'

export default () => {
	const { device } = useSelector(deviceSelector)
	const handleRenderSystem = () => {
		if (device['os_name'] === 'android') {
			return <Android device={device} />
		}
		return <Ios device={device} />
	}

	return (
		<Card title="System" headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }} hoverable={true}>
			{handleRenderSystem()}
		</Card>
	)
}
