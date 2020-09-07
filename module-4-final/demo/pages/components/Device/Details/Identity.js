import Link from 'next/link'

const Identity = () => {
	const userList = ['abcd123', 'efgh456', 'mnbvzcx53462']
	return (
		<div className='bg-white p-10 rounded text-sm self-start w-full'>
			<p className='text-gray-700 font-bold text-xl'>Identity</p>
			<div className='flex text-gray-600 my-2'>
				<span className='w-1/3 font-bold'>Device ID</span>
				<span className='w-2/3'>fdasfsdk2412njfsak</span>
			</div>
			<div className='flex text-gray-600 my-2'>
				<span className='w-1/3 font-bold'>Users</span>
				<span className='w-2/3'>
					<ul>
						{userList.map((u) => (
							<li key={u}>
								<Link href={{ pathname: '/user/', query: { id: u } }}>
									<a className='underline text-blue-600' target='_blank'>
										{u}
									</a>
								</Link>
							</li>
						))}
					</ul>
				</span>
			</div>
			<div className='flex text-gray-600 my-2'>
				<span className='w-1/3 font-bold'>Total Transaction Count</span>
				<span className='w-2/3'>124</span>
			</div>
			<div className='flex text-gray-600 my-2'>
				<span className='w-1/3 font-bold'>Total Amount</span>
				<span className='w-2/3'>600.000 VND</span>
			</div>
			<div className='flex text-gray-600 my-2'>
				<span className='w-1/3 font-bold'>First seen</span>
				<span className='w-2/3'>1 year ago</span>
			</div>
			<div className='flex text-gray-600 my-2'>
				<span className='w-1/3 font-bold'>Last seen</span>
				<span className='w-2/3'>5 days ago</span>
			</div>
		</div>
	)
}

export default Identity
