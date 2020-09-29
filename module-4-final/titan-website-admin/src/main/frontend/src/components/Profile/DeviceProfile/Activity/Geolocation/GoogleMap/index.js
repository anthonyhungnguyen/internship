import React, { useState, useEffect } from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import { useSelector } from 'react-redux'
import { FullscreenOutlined, RollbackOutlined } from '@ant-design/icons'
import { Card, Modal, Skeleton } from 'antd'
import './index.css'
import { generalSelector } from '../../../../../slices/general'
import { deviceSelector } from '../../../../../slices/device'

const containerStyle = {
	height: '100%'
}

export default () => {
	const [ map, setMap ] = useState(null)
	const { id } = useSelector(generalSelector)
	const { filters } = useSelector(deviceSelector)
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: 'AIzaSyDmbl-UzpILeyTFM5_UbvCRiLHa5-6yhpU'
	})
	const [ visible, setVisible ] = useState(false)
	console.log(map)
	const renderMap = React.useCallback(
		() => {
			const onLoad = async (map) => {
				const response = await fetch('http://localhost:8085/api/user_device/test', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						query: `FOR v, e IN 1..1 ANY @id user_device_transaction
					FILTER e.latitude != '0.0' AND e.longitude != '0.0'
					AND DATE_TIMESTAMP(e.reqDate) >= DATE_TIMESTAMP(@fromDate) AND DATE_TIMESTAMP(e.reqDate) <= DATE_TIMESTAMP(@toDate)
					COLLECT lat = e.latitude,
							lng = e.longitude WITH COUNT INTO location_count
					RETURN {lat, lng, location_count}`,
						bindVars: {
							id: `devices/${id}`,
							fromDate: filters.range[0],
							toDate: filters.range[1]
						}
					})
				})

				const data = await response.json()
				console.log(data)

				const bounds = new window.google.maps.LatLngBounds()
				data.forEach((gl) => {
					const marker = new window.google.maps.Marker({
						position: new window.google.maps.LatLng(parseFloat(gl.lat), parseFloat(gl.lng)),
						map: map,
						animation: window.google.maps.Animation.DROP
					})
					bounds.extend(marker.getPosition())
				})

				map.fitBounds(bounds)
			}

			const onUnmount = (map) => {
				setMap(null)
			}

			return <GoogleMap onLoad={onLoad} onUnmount={onUnmount} mapContainerStyle={containerStyle} />
		},
		[ id, filters ]
	)

	const handleToggleVisible = () => {
		setVisible((old) => !old)
	}

	if (loadError) {
		return <p>Map Error</p>
	}

	return (
		<React.Fragment>
			<Card
				title={'Geolocation'}
				headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
				hoverable={true}
				className="w-full h-full"
				bodyStyle={{ height: '80%' }}
				extra={
					<button onClick={handleToggleVisible}>
						<FullscreenOutlined className="text-xl" />
					</button>
				}
			>
				{isLoaded ? renderMap() : <Skeleton active />}
			</Card>
			<Modal
				title={'Geolocation'}
				visible={visible}
				onOk={handleToggleVisible}
				onCancel={handleToggleVisible}
				centered
				width={1000}
				height={800}
				bodyStyle={{ height: '90%' }}
				footer={null}
			>
				{isLoaded ? renderMap() : <Skeleton active />}
			</Modal>
		</React.Fragment>
	)
}
