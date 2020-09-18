import React, { useState } from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import { useSelector } from 'react-redux'
import { FullscreenOutlined, RollbackOutlined } from '@ant-design/icons'
import { Card, Modal, Skeleton } from 'antd'
import { deviceActivitySelector } from '../../../../slices/deviceActivity'
import './index.css'

const containerStyle = {
	height: '100%'
}

export default () => {
	const [ map, setMap ] = useState(null)
	const { geolocationActivity } = useSelector(deviceActivitySelector)
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: 'AIzaSyDmbl-UzpILeyTFM5_UbvCRiLHa5-6yhpU'
	})
	const [ visible, setVisible ] = useState(false)

	const renderMap = React.useCallback(() => {
		const onLoad = (map) => {
			const bounds = new window.google.maps.LatLngBounds()
			geolocationActivity.forEach((gl) => {
				const marker = new window.google.maps.Marker({
					position: new window.google.maps.LatLng(parseFloat(gl.lat), parseFloat(gl.lng)),
					map: map,
					animation: window.google.maps.Animation.DROP
				})
				bounds.extend(marker.getPosition())
			})
			map.fitBounds(bounds)
			setMap(map)
		}

		const onUnmount = (map) => {
			setMap(null)
		}

		return <GoogleMap onLoad={onLoad} onUnmount={onUnmount} mapContainerStyle={containerStyle} />
	}, [])

	const handleToggleVisible = () => {
		setVisible((old) => !old)
	}

	if (loadError) {
		return <p>Map Error</p>
	}

	return (
		<React.Fragment>
			<Card
				title={geolocationActivity.length !== 0 ? 'Geolocation Activity' : 'Geolocation Activity - No records'}
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
				title={geolocationActivity.length !== 0 ? 'Geolocation Activity' : 'Geolocation Activity - No records'}
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
