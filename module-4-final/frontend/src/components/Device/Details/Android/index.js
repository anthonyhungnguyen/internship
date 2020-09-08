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
	return (
		<React.Fragment>
			<Row label="Recorded At" data={moment(timestamp).format('YYYY-MM-DD LTS')} />
			<Row label="Last Used By" data={userId} />
			<Row label="User Agent" data={user_agent} />
			<Row label="OS Name" data={os_name} dataCSS="capitalize" />
			<Row label="OS Version" data={os_version} />
			<Row label="OS Root Access" data={os_root_access} />
			<Row label="Device" data={hw_device_string} />
			<Row label="CPU Name" data={hw_cpu_name} />
			<Row label="CPU Speed" data={hw_cpu_speed} />
			<Row label="CPU Min Speed" data={hw_cpu_min_speed} />
			<Row label="CPU Support 32-bit" data={hw_cpu_supported_32_bit_abis} />
			<Row label="CPU Support 64-bit" data={hw_cpu_supported_64_bit_abis} />
			<Row label="CPU Core Count" data={hw_cpu_core_count} />
			<Row label="CPU Processor" data={hw_cpu_processor} />
			<Row label="Screen Size" data={hw_screen_size} />
			<Row label="Screen Aspect Ratio" data={hw_screen_aspect_ratio} />
			<Row label="Screen Pixel Density" data={hw_screen_pixel_density} />
			<Row label="Screen Resolution" data={hw_screen_resolution} />
			<Row label="Screen Refresh Rate" data={hw_screen_refresh_rate} />
			<Row label="Wifi MAC Address" data={network_wifi_mac_address} />
			<Row label="Storage Total" data={hw_storage_total} />
			<Row label="Ram Total" data={hw_ram_total} />
			<Row label="Number Of Cameras" data={hw_camera_number_camera} />
			<Row label="Camera Front Photo Resolution" data={hw_camera_front_max_photo_resolution} />
			<Row label="Camera Front Video Resolution" data={hw_camera_back_max_video_resolution} />
			<Row label="Camera Back Photo Resolution" data={hw_camera_back_max_photo_resolution} />
			<Row label="Camera Back Video Resolution" data={hw_camera_front_max_video_resolution} />
		</React.Fragment>
	)
}
