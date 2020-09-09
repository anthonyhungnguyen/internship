import React, { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import moment from 'moment'

export default ({ device }) => {
	console.log(device)
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
		'Recorded At': moment(timestamp).format('YYYY'),
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
		<Fragment>
			{Object.keys(iosField).map((k) => (
				<Row className="my-2">
					<Col className="font-bold" xs={3}>
						{k}
					</Col>
					<Col xs={9}>{iosField[k]}</Col>
				</Row>
			))}
		</Fragment>
	)
}
