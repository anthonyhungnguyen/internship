import React from 'react'
const IPInformation = () => {
	return (
		<div className="bg-white p-10 rounded self-start w-full">
			<p className="text-gray-800 font-bold text-2xl">IP Information</p>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">IP Address</span>
				<span className="w-2/3">1.53.255.136 (IPv4)</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">Location</span>
				<span className="w-2/3" />
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">Country</span>
				<span className="w-2/3">Vietnam (VN)</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">Region</span>
				<span className="w-2/3">Ho Chi Minh (SG)</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">Latitude & Longitude</span>
				<span className="w-2/3">10.81420, 106.64380</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">Tor Relay IP Address</span>
				<span className="w-2/3">No</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">VPN IP Address</span>
				<span className="w-2/3">Not Detected</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">Proxy IP Address</span>
				<span className="w-2/3">Not Detected</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">Hostname</span>
				<span className="w-2/3">Unknown. Could not resolve hostname.</span>
			</div>
		</div>
	)
}

export default IPInformation
