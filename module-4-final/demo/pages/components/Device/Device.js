import Score from './Score'
const Device = () => {
	return (
		<section className='w-full text-gray-700'>
			<div className='flex border-b w-full justify-between'>
				<input type='text' placeholder='enter device id' className='w-2/3 p-4' />
				<button className='p-4 mr-5 bg-blue-500 w-1/12 text-white font-bold'>Search</button>
			</div>

			<ul className='flex px-3 border-b'>
				<li className='mx-4'>
					<button className='p-4 border-b-2 border-blue-400 font-bold'>Details</button>
				</li>
				<li className='mx-4'>
					<button className='p-4'>Activity</button>
				</li>
				<li className='mx-4'>
					<button className='p-4'>Customer Connections</button>
				</li>
			</ul>

			<div className='p-4 bg-gray-300'>
				<Score />

				<div className='flex mt-4 flex-wrap flex-row gap-4'>
					<div className='bg-white p-10 rounded text-sm self-start w-1/2 flex-1'>
						<p className='text-gray-700 font-bold text-xl'>System</p>
						<div className='flex text-gray-600 my-2'>
							<span className='w-1/3 font-bold'>Device type</span>
							<span className='w-2/3'>desktop</span>
						</div>
						<div className='flex text-gray-600 my-2'>
							<span className='w-1/3 font-bold'>OS</span>
							<span className='w-2/3'>MacOS</span>
						</div>
						<div className='flex text-gray-600 my-2'>
							<span className='w-1/3 font-bold'>User Agent</span>
							<span className='w-2/3'>
								Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0
							</span>
						</div>
						<div className='flex text-gray-600 my-2'>
							<span className='w-1/3 font-bold'>Fingerprinting Resistance</span>
							<span className='w-2/3'>None detected</span>
						</div>
						<div className='flex text-gray-600 my-2'>
							<span className='w-1/3 font-bold'>Speakers</span>
							<span className='w-2/3'>
								<ul>
									<li>Number of speakers: 1</li>
								</ul>
							</span>
						</div>
						<div className='flex text-gray-600 my-2'>
							<span className='w-1/3 font-bold'>Microphones</span>
							<span className='w-2/3'>None detected</span>
						</div>
						<div className='flex text-gray-600 my-2'>
							<span className='w-1/3 font-bold'>CPU</span>
							<span className='w-2/3'>
								<ul>
									<li>Architecture: x64 (64-bit) </li>
									<li>Number of cores: 4</li>
								</ul>
							</span>
						</div>
						<div className='flex text-gray-600 my-2'>
							<span className='w-1/3 font-bold'>Memory (RAM)</span>
							<span className='w-2/3'>8 GB or more</span>
						</div>
						<div className='flex text-gray-600 my-2'>
							<span className='w-1/3 font-bold'>Battery</span>
							<span className='w-2/3'>
								<ul>
									<li>Level: 100% </li>
									<li>Charging: Yes</li>
									<li>Time remaining before charged: 0 seconds</li>
								</ul>
							</span>
						</div>
						<div className='flex text-gray-600 my-2'>
							<span className='w-1/3 font-bold'>Screen</span>
							<span className='w-2/3'>
								<ul>
									<li>Orientation (Live): Landscape</li>
									<li>Resolution: 1920 x 1080 (pixels) </li>
									<li>Device Pixel Ratio: 1</li>
									<li>Color Depth: 24-bit</li>
								</ul>
							</span>
						</div>
					</div>
					<div className='flex gap-4 flex-col flex-1'>
						<div className='bg-white p-10 rounded text-sm self-start w-full'>
							<p className='text-gray-700 font-bold text-xl'>Identity</p>
							<div className='flex text-gray-600 my-2'>
								<span className='w-1/3 font-bold'>Device ID</span>
								<span className='w-2/3'>fdasfsdk2412njfsak</span>
							</div>
							<div className='flex text-gray-600 my-2'>
								<span className='w-1/3 font-bold'>Users</span>
								<span className='w-2/3' />
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
						<div className='bg-white p-10 rounded text-sm self-start w-full'>
							<p className='text-gray-700 font-bold text-xl'>IP Information</p>
							<div className='flex text-gray-600 my-2'>
								<span className='w-1/3 font-bold'>IP Address</span>
								<span className='w-2/3'>1.53.255.136 (IPv4)</span>
							</div>
							<div className='flex text-gray-600 my-2'>
								<span className='w-1/3 font-bold'>Location</span>
								<span className='w-2/3' />
							</div>
							<div className='flex text-gray-600 my-2'>
								<span className='w-1/3 font-bold'>Country</span>
								<span className='w-2/3'>Vietnam (VN)</span>
							</div>
							<div className='flex text-gray-600 my-2'>
								<span className='w-1/3 font-bold'>Region</span>
								<span className='w-2/3'>Ho Chi Minh (SG)</span>
							</div>
							<div className='flex text-gray-600 my-2'>
								<span className='w-1/3 font-bold'>Latitude & Longitude</span>
								<span className='w-2/3'>10.81420, 106.64380</span>
							</div>
							<div className='flex text-gray-600 my-2'>
								<span className='w-1/3 font-bold'>Tor Relay IP Address</span>
								<span className='w-2/3'>No</span>
							</div>
							<div className='flex text-gray-600 my-2'>
								<span className='w-1/3 font-bold'>VPN IP Address</span>
								<span className='w-2/3'>Not Detected</span>
							</div>
							<div className='flex text-gray-600 my-2'>
								<span className='w-1/3 font-bold'>Proxy IP Address</span>
								<span className='w-2/3'>Not Detected</span>
							</div>
							<div className='flex text-gray-600 my-2'>
								<span className='w-1/3 font-bold'>Hostname</span>
								<span className='w-2/3'>Unknown. Could not resolve hostname.</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Device
