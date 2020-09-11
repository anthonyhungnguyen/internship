import React, { Fragment } from 'react'
import { Row, Col, Descriptions, Badge } from 'antd'
import moment from 'moment'

export default ({ device }) => {
	const {
		timestamp,
		userId,
		hw_cpu_name,
		hw_screen_aspect_ratio,
		hw_screen_pixel_density,
		network_wifi_mac_address,
		hw_screen_resolution,
		os_version,
		hw_cpu_speed,
		hw_screen_refresh_rate,
		os_name,
		os_root_access,
		hw_cpu_supported_64_bit_abis,
		user_agent,
		hw_device_string,
		hw_cpu_core_count,
		hw_cpu_supported_32_bit_abis,
		hw_cpu_processor,
		hw_screen_size,
		hw_ram_total,
		hw_cpu_min_speed,
		hw_storage_total,
		hw_camera_front_max_photo_resolution,
		hw_camera_back_max_video_resolution,
		hw_camera_number_camera,
		hw_camera_back_max_photo_resolution,
		hw_camera_front_max_video_resolution
	} = device
	const androidField = {
		'Recorded At': moment(timestamp).format('L LTS'),
		'Last Used By': userId,
		'User Agent': user_agent,
		'OS Name': os_name,
		'OS Version': os_version,
		'OS Root Access': os_root_access,
		'Device Model': hw_device_string,
		'CPU Name': hw_cpu_name,
		'CPU Speed': hw_cpu_speed,
		'CPU Min Speed': hw_cpu_min_speed,
		'CPU Support 32-bit': hw_cpu_supported_32_bit_abis,
		'CPU Support 64-bit': hw_cpu_supported_64_bit_abis,
		'CPU Core Count': hw_cpu_core_count,
		'CPU Processor': hw_cpu_processor,
		'Screen Size': hw_screen_size,
		'Screen Aspect Ratio': hw_screen_aspect_ratio,
		'Screen Resolution': hw_screen_resolution,
		'Screen Pixel Density': hw_screen_pixel_density,
		'Screen Refresh Rate': hw_screen_refresh_rate,
		'Wifi Mac Address': network_wifi_mac_address,
		'Storage Total': hw_storage_total,
		'RAM Total': hw_ram_total,
		'Number Of Cameras': hw_camera_number_camera,
		'Camera Front Photo Resolution': hw_camera_front_max_photo_resolution,
		'Camera Front Video Resolution': hw_camera_front_max_video_resolution,
		'Camera Back Photo Resolution': hw_camera_back_max_photo_resolution,
		'Camera Back Video Resolution': hw_camera_back_max_video_resolution
	}
	return (
		<Descriptions column={1} bordered>
			{Object.keys(androidField).map((k, i) => (
				<Descriptions.Item label={k} key={i}>
					{androidField[k]}
				</Descriptions.Item>
			))}
		</Descriptions>
	)
}
