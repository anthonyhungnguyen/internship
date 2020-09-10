import React, { Fragment, useState, useEffect } from 'react'
import Details from './Details'
import Search from './Search'
import { Row, Col } from 'antd'
import Activity from './Activity'
import Connection from './Connection'
import { useDispatch } from 'react-redux'
import { fetchDevice } from '../../slices/device'
import { fetchActivity } from '../../slices/deviceActivity'
import { fetchConnection } from '../../slices/deviceConnection'

export default () => {
	const dispatch = useDispatch()
	const [ currentTab, setCurrentTab ] = useState('details')
	const [ currentDeviceId, setCurrentDeviceId ] = useState('EDF10704-E7E4-4CC6-BA25-9A30C7720D02')

	useEffect(
		() => {
			dispatch(fetchDevice(currentDeviceId))
			dispatch(fetchActivity(currentDeviceId))
			dispatch(fetchConnection(currentDeviceId))
		},
		[ dispatch, currentDeviceId ]
	)

	return (
		<Fragment>
			<Row gutter={[ 24, 24 ]}>
				<Col span={24}>
					<Search setCurrentTab={setCurrentTab} setCurrentDeviceId={setCurrentDeviceId} />
				</Col>
			</Row>
			{currentTab === 'details' && <Details />}
			{currentTab === 'activity' && <Activity />}
			{currentTab === 'connection' && <Connection />}
		</Fragment>
	)
}
