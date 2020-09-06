import React from 'react'
import { deviceSelector } from '../../../../slices/device'
import { useSelector } from 'react-redux'
import Row from '../Row'
import moment from 'moment'
export default () => {
	const { device } = useSelector(deviceSelector)
	const {
		timestamp,
		userId,
		network_wifi_mac_address,
		os_version,
		hw_device_manufacturer,
		hw_device_model,
		os_name,
		user_agent,
		hw_device_string,
		hw_screen_size,
		hw_ram_total,
		hw_storage_total
	} = device
	return (
		<React.Fragment>
			<Row label="Recorded At" data={moment(timestamp).format('YYYY-MM-DD LTS')} />
			<Row label="Last Used By" data={userId} />
			<Row label="User Agent" data={user_agent} />
			<Row label="OS Name" data={os_name} dataCSS="capitalize" />
			<Row label="OS Version" data={os_version} />
			<Row label="Device" data={hw_device_string} />
			<Row label="Device Manufacturer" data={hw_device_manufacturer} />
			<Row label="Device Model" data={hw_device_model} />
			<Row label="Screen Size" data={hw_screen_size} />
			<Row label="Wifi MAC Address" data={network_wifi_mac_address} />
			<Row label="Storage Total" data={hw_storage_total} />
			<Row label="Ram Total" data={hw_ram_total} />
		</React.Fragment>
	)
}
