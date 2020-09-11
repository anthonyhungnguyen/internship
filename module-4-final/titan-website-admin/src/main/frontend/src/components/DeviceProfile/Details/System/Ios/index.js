import React from 'react'
import { Descriptions } from 'antd'
import moment from 'moment'

export default ({ device }) => {
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
	const iosField = {
		'Recorded At': moment(timestamp).format('L LTS'),
		'Last Used By': userId,
		'User Agent': user_agent,
		'OS Name': os_name,
		'OS Version': os_version,
		Device: hw_device_string,
		'Device Manufacturer': hw_device_manufacturer,
		'Device Model': hw_device_model,
		'Screen Size': hw_screen_size,
		'Wifi Mac Address': network_wifi_mac_address,
		'Storage Total': hw_storage_total,
		'RAM Total': hw_ram_total
	}
	return (
		<Descriptions column={1} bordered>
			{Object.keys(iosField).map((k, i) => (
				<Descriptions.Item label={k} key={i}>
					{iosField[k]}
				</Descriptions.Item>
			))}
		</Descriptions>
	)
}
