import React from 'react'
import Details from './Details'
import { useState, useEffect } from 'react'
import Search from './Search'
import TabChange from './TabChange'
import { useDispatch, useSelector } from 'react-redux'
import { deviceSelector, fetchDevice } from '../../slices/device'
import Error from './Error'
const Device = () => {
	const dispatch = useDispatch()
	const [ tabOpen, setTabOpen ] = useState('details')
	const { device, loading, hasErrors } = useSelector(deviceSelector)

	useEffect(
		() => {
			if (!device) {
				dispatch(fetchDevice('7FB63D3E-D3EE-423A-9DBD-501A3A454287'))
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
					{tabOpen === 'activity' && <div>GOGO</div>}
					{tabOpen === 'deviceconnection' && <div>HELO</div>}
				</React.Fragment>
			)}
		</section>
	)
}

export default Device
