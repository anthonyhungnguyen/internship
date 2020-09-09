import React from 'react'
import Details from './Details'
import { useState, useEffect } from 'react'
import Search from './Search'
import TabChange from './TabChange'
import { useDispatch, useSelector } from 'react-redux'
import { deviceSelector, fetchDevice } from '../../slices/device'
import Error from './Error'
import Activity from './Activity'
import DeviceConnection from './DeviceConnection'
const Device = () => {
	const dispatch = useDispatch()
	const [ tabOpen, setTabOpen ] = useState('details')
	const { device, loading, hasErrors } = useSelector(deviceSelector)

	useEffect(
		() => {
			if (!device) {
				dispatch(fetchDevice('EDF10704-E7E4-4CC6-BA25-9A30C7720D02'))
			}
		},
		[ device, dispatch ]
	)
	return (
		<section className="w-full text-gray-700">
			<Search />
			<TabChange tabOpen={tabOpen} setTabOpen={setTabOpen} />
			{hasErrors ? (
				<Error />
			) : (
				<React.Fragment>
					{!loading && tabOpen === 'details' && <Details />}
					{tabOpen === 'activity' && <Activity />}
					{tabOpen === 'deviceconnection' && <DeviceConnection />}
				</React.Fragment>
			)}
		</section>
	)
}

export default Device
