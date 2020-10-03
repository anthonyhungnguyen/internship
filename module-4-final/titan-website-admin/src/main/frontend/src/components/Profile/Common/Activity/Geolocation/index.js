import React, { useState, useEffect } from 'react'
import ReactMapboxGl, { Layer, Feature, ZoomControl, ScaleControl } from 'react-mapbox-gl'
import axios from 'axios'
import { FullscreenOutlined } from '@ant-design/icons'
import { Card, Empty, Modal, Skeleton } from 'antd'
import './index.css'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const Map = ReactMapboxGl({
	accessToken: 'pk.eyJ1Ijoid2xmZWkiLCJhIjoiY2puMTB6MXZlNHZjcTNwbnl3dnowYjhoaSJ9.s6ZkjRHGIY6xVNBRAf52MQ'
})

const layerPaint = {
	// 'heatmap-weight': {
	// 	property: 'location_count',
	// 	type: 'exponential',
	// 	stops: [ [ 0, 0 ], [ 10, 2 ] ]
	// },
	// // Increase the heatmap color weight weight by zoom level
	// // heatmap-ntensity is a multiplier on top of heatmap-weight
	// 'heatmap-intensity': {
	// 	stops: [ [ 0, 0 ], [ 10, 1.2 ] ]
	// },
	// Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
	// Begin color ramp at 0-stop with a 0-transparancy color
	// to create a blur-like effect.
	'heatmap-color': [
		'interpolate',
		[ 'linear' ],
		[ 'heatmap-density' ],
		0,
		'rgba(33,102,172,0)',
		0.2,
		'rgb(103,169,207)',
		0.4,
		'rgb(209,229,240)',
		0.6,
		'rgb(253,219,199)',
		0.8,
		'rgb(239,138,98)',
		1,
		'rgb(178,24,43)'
	]
	// 'heatmap-radius': {
	// 	stops: [ [ 0, 1 ], [ 10, 30 ] ]
	// }
}

export default React.memo(({ id, type, filters }) => {
	const [ map, setMap ] = useState(null)
	const [ geolocationActivity, setGeolocationActivity ] = useState(null)
	const [ bounds, setBounds ] = useState(null)
	const [ visible, setVisible ] = useState(false)
	const [ noData, setNoData ] = useState(false)
	const [ mapStyle, setMapStyle ] = useState('mapbox://styles/mapbox/streets-v11')

	useEffect(() => {
		if (map) {
			map.resize()
		}
	})

	useEffect(
		() => {
			const fetchGeolocationActivity = async () => {
				await axios
					.post(`http://localhost:8085/api/profile/geolocation`, {
						id: id,
						type: type,
						fromDate: filters.range[0],
						toDate: filters.range[1]
					})
					.then((response) => {
						const data = response.data
						if (data.length > 0) {
							const processedData = data.map((d) => ({
								latlng: [ d.lat, d.lng ],
								location_count: d.location_count
							}))
							const bounds = new mapboxgl.LngLatBounds()
							processedData.forEach((gla) => {
								bounds.extend([ gla.latlng[1], gla.latlng[0] ])
							})
							setBounds([
								[ bounds.getSouthWest().lng, bounds.getSouthWest().lat ],
								[ bounds.getNorthEast().lng, bounds.getNorthEast().lat ]
							])
							setNoData(false)
							setGeolocationActivity(processedData)
						} else {
							setNoData(true)
						}
					})
					.catch((err) => {
						console.log(err)
					})
			}
			fetchGeolocationActivity()
		},
		[ id, filters ]
	)

	const handleToggleVisible = () => {
		setVisible((old) => !old)
	}

	const handleSwitchMapStyle = () => {
		if (mapStyle === 'mapbox://styles/mapbox/satellite-streets-v11') {
			setMapStyle('mapbox://styles/mapbox/streets-v11')
		} else {
			setMapStyle('mapbox://styles/mapbox/satellite-streets-v11')
		}
	}

	return noData ? (
		<Card
			title={'Geolocation'}
			headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
			hoverable={true}
			className="w-full h-full"
			bodyStyle={{ height: '45vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
		>
			<Empty />
		</Card>
	) : geolocationActivity ? (
		<React.Fragment>
			<Card
				title={'Geolocation'}
				headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
				hoverable={true}
				className="w-full"
				bodyStyle={{ height: '45vh' }}
				extra={
					<button onClick={handleToggleVisible}>
						<FullscreenOutlined className="text-xl" />
					</button>
				}
			>
				<Map
					style={mapStyle}
					containerStyle={{
						textAlign: 'justify',
						height: '100%',
						width: '100%'
					}}
					fitBounds={bounds}
					fitBoundsOptions={{ padding: 100 }}
					onStyleLoad={(e) => {
						setMap(e)
						e.resize()
					}}
				>
					<Layer type="heatmap" paint={layerPaint}>
						{geolocationActivity.map((el, index) => (
							<Feature key={index} coordinates={[ el.latlng[1], el.latlng[0] ]} properties={el} />
						))}
					</Layer>
					<ZoomControl />
					<ScaleControl />
					<div className="absolute" style={{ left: '10px', top: '10px' }}>
						<button className="p-2 bg-white text-black font-bold rounded" onClick={handleSwitchMapStyle}>
							Switch type
						</button>
						<button
							className="p-2 ml-2 bg-white text-black font-bold rounded"
							onClick={() => {
								map.fitBounds(bounds, {
									padding: 100
								})
							}}
						>
							Zoom Back
						</button>
					</div>
				</Map>
			</Card>
			<Modal
				title={'Geolocation'}
				visible={visible}
				onOk={handleToggleVisible}
				onCancel={handleToggleVisible}
				centered
				width={1000}
				height={800}
				bodyStyle={{ height: '70vh' }}
				footer={null}
			>
				<Map
					style={mapStyle}
					containerStyle={{
						height: '100%',
						width: '100%'
					}}
					fitBounds={bounds}
					fitBoundsOptions={{ padding: 100 }}
					onStyleLoad={(e) => {
						setMap(e)
						e.resize()
					}}
				>
					<Layer type="heatmap" paint={layerPaint}>
						{geolocationActivity.map((el, index) => (
							<Feature
								key={index}
								coordinates={[ el.latlng[1], el.latlng[0] ]}
								properties={el}
								onClick={(e) => console.log(e)}
							/>
						))}
					</Layer>
					<ZoomControl />
					<ScaleControl />
					<div className="absolute" style={{ left: '10px', top: '10px' }}>
						<button className="p-2 bg-white text-black font-bold rounded" onClick={handleSwitchMapStyle}>
							Switch type
						</button>
						<button
							className="p-2 ml-2 bg-white text-black font-bold rounded"
							onClick={() =>
								map.fitBounds(bounds, {
									padding: 100
								})}
						>
							Zoom Back
						</button>
					</div>
				</Map>
			</Modal>
		</React.Fragment>
	) : (
		<Skeleton active />
	)
})
