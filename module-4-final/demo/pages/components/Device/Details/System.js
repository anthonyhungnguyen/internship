import { useSelector } from 'react-redux'
import { deviceSelector } from '../../../slices/device'
import moment from 'moment'

const System = () => {
	const { device } = useSelector(deviceSelector)
	const {
		os_version,
		hw_capacity_bluetooth,
		cellular_capabilities,
		user_agent,
		hw_screen_aspect_ratio,
		hw_capacity_force_touch,
		hw_capacity_gps,
		network_wifi_mac_address,
		os_name,
		hw_device_string,
		hw_storage_total,
		os_multitasking,
		hw_ram_total,
		hw_screen_size,
		hw_capacity_cellular,
		hw_device_model,
		zid,
		timestamp,
		wifi_bssid,
		hw_capacity_nfc,
		wifi_ssid
	} = device
	return (
		<div className="bg-white p-10 rounded self-start w-1/2 flex-1">
			<p className="text-gray-800 font-bold text-2xl">System</p>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">Recorded At</span>
				<span className="w-2/3">{moment(timestamp).format('YYYY-MM-DD LTS')}</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">OS</span>
				<span className="w-2/3">{os_name}</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">OS Version</span>
				<span className="w-2/3">{os_version}</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">Device Model</span>
				<span className="w-2/3">{hw_device_model}</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">Device String</span>
				<span className="w-2/3">{hw_device_string}</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">User Agent</span>
				<span className="w-2/3">{user_agent}</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">Bluetooth</span>
				<span className="w-2/3">{hw_capacity_bluetooth}</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">Network Operator</span>
				<span className="w-2/3">{cellular_capabilities}</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">Screen Aspect Ratio</span>
				<span className="w-2/3">{hw_screen_aspect_ratio}</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">Storage Total</span>
				<span className="w-2/3">{hw_storage_total}</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">RAM Total</span>
				<span className="w-2/3">{hw_ram_total}</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">Sreen Size</span>
				<span className="w-2/3">{hw_screen_size}</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">ZID</span>
				<span className="w-2/3">{zid}</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">Wifi Mac Address</span>
				<span className="w-2/3">{network_wifi_mac_address}</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">Force Touch</span>
				<span className="w-2/3">{hw_capacity_force_touch}</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">GPS</span>
				<span className="w-2/3">{hw_capacity_gps}</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">Multitasking</span>
				<span className="w-2/3">{os_multitasking}</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">Cellular</span>
				<span className="w-2/3">{hw_capacity_cellular}</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">NFC</span>
				<span className="w-2/3">{hw_capacity_nfc}</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">Wifi BSSID</span>
				<span className="w-2/3">{wifi_bssid}</span>
			</div>
			<div className="flex text-gray-700 my-3">
				<span className="w-1/3 font-bold">Wifi SSID</span>
				<span className="w-2/3">{wifi_ssid}</span>
			</div>
		</div>
	)
}
export default System
