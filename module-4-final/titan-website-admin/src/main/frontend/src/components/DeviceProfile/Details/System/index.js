import React from 'react'
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap'
import { useSelector } from 'react-redux'
import Android from './Android'
import Ios from './Ios'
import { deviceSelector } from '../../../../slices/device'

export default () => {
	const { device, loading } = useSelector(deviceSelector)

	const handleRenderSystem = () => {
		if (loading) {
			return <p>Loading</p>
		}
		if (device['os_name'] === 'android') {
			return <Android device={device} />
		}
		return <Ios device={device} />
	}

	return (
		<Card>
			<CardHeader>System</CardHeader>
			<CardBody>{handleRenderSystem()}</CardBody>
		</Card>
	)
}
