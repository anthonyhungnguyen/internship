const System = () => {
	return (
		<div className="bg-white p-10 rounded text-sm self-start w-1/2 flex-1">
			<p className="text-gray-700 font-bold text-xl">System</p>
			<div className="flex text-gray-600 my-2">
				<span className="w-1/3 font-bold">Device type</span>
				<span className="w-2/3">desktop</span>
			</div>
			<div className="flex text-gray-600 my-2">
				<span className="w-1/3 font-bold">OS</span>
				<span className="w-2/3">MacOS</span>
			</div>
			<div className="flex text-gray-600 my-2">
				<span className="w-1/3 font-bold">User Agent</span>
				<span className="w-2/3">
					Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0
				</span>
			</div>
			<div className="flex text-gray-600 my-2">
				<span className="w-1/3 font-bold">Fingerprinting Resistance</span>
				<span className="w-2/3">None detected</span>
			</div>
			<div className="flex text-gray-600 my-2">
				<span className="w-1/3 font-bold">Speakers</span>
				<span className="w-2/3">
					<ul>
						<li>Number of speakers: 1</li>
					</ul>
				</span>
			</div>
			<div className="flex text-gray-600 my-2">
				<span className="w-1/3 font-bold">Microphones</span>
				<span className="w-2/3">None detected</span>
			</div>
			<div className="flex text-gray-600 my-2">
				<span className="w-1/3 font-bold">CPU</span>
				<span className="w-2/3">
					<ul>
						<li>Architecture: x64 (64-bit) </li>
						<li>Number of cores: 4</li>
					</ul>
				</span>
			</div>
			<div className="flex text-gray-600 my-2">
				<span className="w-1/3 font-bold">Memory (RAM)</span>
				<span className="w-2/3">8 GB or more</span>
			</div>
			<div className="flex text-gray-600 my-2">
				<span className="w-1/3 font-bold">Battery</span>
				<span className="w-2/3">
					<ul>
						<li>Level: 100% </li>
						<li>Charging: Yes</li>
						<li>Time remaining before charged: 0 seconds</li>
					</ul>
				</span>
			</div>
			<div className="flex text-gray-600 my-2">
				<span className="w-1/3 font-bold">Screen</span>
				<span className="w-2/3">
					<ul>
						<li>Orientation (Live): Landscape</li>
						<li>Resolution: 1920 x 1080 (pixels) </li>
						<li>Device Pixel Ratio: 1</li>
						<li>Color Depth: 24-bit</li>
					</ul>
				</span>
			</div>
		</div>
	)
}
export default System
