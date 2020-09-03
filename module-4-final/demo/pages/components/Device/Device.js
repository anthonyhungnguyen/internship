import Details from './Details/Details'
import { useState, useEffect } from 'react'
import Search from './Search/Search'
import Navigation from './Navigation/Navigation'
import { useDispatch, useSelector } from 'react-redux'
import { deviceSelector, fetchDevice } from '../../slices/device'
import Error from './Error/Error'
const Device = () => {
	const dispatch = useDispatch()
	const [ tabOpen, setTabOpen ] = useState('details')
	const { device, loading, hasErrors, errorInfo } = useSelector(deviceSelector)

	useEffect(
		() => {
			if (!device) {
				dispatch(fetchDevice('7FB63D3E-D3EE-423A-9DBD-501A3A454287'))
			}
		},
		[ dispatch ]
	)
	return (
		<section className="w-full text-gray-700">
			<Search />
			<Navigation tabOpen={tabOpen} setTabOpen={setTabOpen} />
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
