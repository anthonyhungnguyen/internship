import Details from './Details/Details'
import { useState } from 'react'
import Search from './Search/Search'
import Navigation from './Navigation/Navigation'
const Device = () => {
	const [ tabOpen, setTabOpen ] = useState('details')

	return (
		<section className="w-full text-gray-700">
			<Search />
			<Navigation tabOpen={tabOpen} setTabOpen={setTabOpen} />
			{tabOpen === 'details' && <Details />}
			{tabOpen === 'activity' && <div>GOGO</div>}
			{tabOpen === 'deviceconnection' && <div>HELO</div>}
		</section>
	)
}

export default Device
