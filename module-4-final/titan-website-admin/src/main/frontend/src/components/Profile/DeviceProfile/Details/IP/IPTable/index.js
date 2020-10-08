import React, { useEffect, useState } from 'react'
import { Descriptions, Skeleton } from 'antd'
import axios from 'axios'

export default ({ ip }) => {
	const [ loading, setLoading ] = useState(true)
	const [ ipInformation, setIPInformation ] = useState(null)

	useEffect(
		() => {
			setLoading(true)
			axios
				.get(
					'https://cors-anywhere.herokuapp.com/' +
						`https://data.bcell.xyz/api/0.1/ip/${ip}?token=va324u08d0-8-dafdsf`,
					{
						headers: {
							'X-Requested-With': 'XMLHttpRequest'
						}
					}
				)
				.then((response) => {
					const result = response.data.result
					setIPInformation({
						ASN: result.asn.asn,
						'ASN Domain': result.asn.domain,
						'ASN Name': result.asn.name,
						'ASN Route': result.asn.route,
						'ASN Type': result.asn.type,
						City: result.city,
						Country: result.country,
						'Country Code': result.country_code,
						Latitude: result.lat,
						Longitude: result.long,
						Region: result.region,
						'Region Code': result.region_code,
						TOR: result.threats.tor,
						Proxy: result.threats.proxy,
						Attacker: result.threats.attacker,
						Bogon: result.threats.bogon
					})
					setLoading(false)
				})
				.catch(console.error)
		},
		[ ip ]
	)

	return !loading ? (
		<Descriptions column={1} bordered>
			{Object.keys(ipInformation).map((k, i) => (
				<Descriptions.Item label={k} key={i}>
					{ipInformation[k]}
				</Descriptions.Item>
			))}
		</Descriptions>
	) : (
		<Skeleton active />
	)
}
