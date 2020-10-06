import React from 'react'
import { Card, Empty } from 'antd'
import { useSelector } from 'react-redux'
import Android from './Android'
import Ios from './Ios'
import { deviceSelector } from '../../../../../slices/device'

export default () => {
	const { device } = useSelector(deviceSelector)

	return (
		<Card title="System" headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }} hoverable={true}>
			{device ? device['os_name'] === 'android' ? (
				<Android device={device} />
			) : (
				<Ios device={device} />
			) : (
				<Empty />
			)}
		</Card>
	)
}
