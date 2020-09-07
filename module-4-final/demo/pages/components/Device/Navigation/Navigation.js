export default function Navigation({ tabOpen, setTabOpen }) {
	return (
		<ul className='flex px-3 border-b'>
			<li className='mx-4'>
				<button
					className={
						'p-4 ' +
						(
							tabOpen == 'details' ? 'border-b-2 border-blue-400 font-bold' :
							'')
					}
					onClick={() => setTabOpen('details')}
				>
					Details
				</button>
			</li>
			<li className='mx-4'>
				<button
					className={
						'p-4 active:border-b-2 active:border-blue-400 ' +
						(
							tabOpen == 'activity' ? 'border-b-2 border-blue-400 font-bold' :
							'')
					}
					onClick={() => setTabOpen('activity')}
				>
					Activity
				</button>
			</li>
			<li className='mx-4'>
				<button
					className={
						'p-4 ' +
						(
							tabOpen == 'device_connection' ? 'border-b-2 border-blue-400 font-bold' :
							'')
					}
					onClick={() => setTabOpen('device_connection')}
				>
					Device Connections
				</button>
			</li>
		</ul>
	)
}
