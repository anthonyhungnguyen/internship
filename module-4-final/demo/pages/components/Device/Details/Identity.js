import { useSelector } from 'react-redux'
import { deviceSelector } from '../../../slices/device'
import Link from 'next/link'

const Identity = () => {
	useSelector
	const { device } = useSelector(deviceSelector)
	const { id, users } = device
	return (
		<div className="bg-white p-10 rounded self-start w-full">
			<p className="text-gray-800 font-bold text-2xl">Identity</p>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">Device ID</span>
				<span className="w-2/3">{id}</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">Total Users</span>
				<span className="w-2/3">{users.length}</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">Users</span>
				<span className="w-2/3">
					<ul>
						{users.map((u) => (
							<li key={u.id}>
								<Link href={{ pathname: `/user/${u.id}` }}>
									<a className="underline text-blue-700">{u.id}</a>
								</Link>
							</li>
						))}
					</ul>
				</span>
			</div>
		</div>
	)
}

export default Identity
