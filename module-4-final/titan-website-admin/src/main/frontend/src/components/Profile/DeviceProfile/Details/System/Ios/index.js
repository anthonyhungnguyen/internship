import React from 'react'
import { Descriptions } from 'antd'
export default ({ device }) => {
	const {
		os_version,
		hw_device_model,
		user_agent,
		hw_device_string,
		hw_screen_size,
		hw_ram_total,
		hw_storage_total
	} = device
	const iosField = {
		'User Agent': user_agent,
		'OS Version': os_version,
		Device: hw_device_string,
		'Device Model': hw_device_model,
		'Screen Size': hw_screen_size,
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
