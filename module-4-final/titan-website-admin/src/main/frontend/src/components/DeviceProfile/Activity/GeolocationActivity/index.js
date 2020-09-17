import React, { useState } from 'react'
import { Card, Modal } from 'antd'
import { useSelector } from 'react-redux'
import { deviceActivitySelector } from '../../../../slices/deviceActivity'
import 'echarts-extension-gmap/dist/echarts-extension-gmap'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import { FullscreenOutlined, FullscreenExitOutlined, RollbackOutlined } from '@ant-design/icons'

export default React.memo(() => {
	const calculateZoomFactor = () => {
		if (geolocationActivity.length !== 0) {
			const lngList = geolocationActivity.map((gl) => parseFloat(gl.lng))
			const latList = geolocationActivity.map((gl) => parseFloat(gl.lat))
			const west = Math.min(...lngList)
			const east = Math.max(...lngList)
			const north = Math.min(...latList)
			const south = Math.max(...latList)

			let angle = east - west
			let angle2 = north - south
			let delta = 0

			if (angle2 > angle) {
				angle = angle2
				delta = 3
			}
			if (angle < 0) {
				angle += 360
			}
			console.log(Math.floor(Math.log(960 * 360 / angle / 256) / Math.LN2) - 2 - delta)
			return Math.floor(Math.log(960 * 360 / angle / 256) / Math.LN2) - 2 - delta
		} else {
			return 4
		}
	}

	const calculateDefaultCenter = () => {
		if (geolocationActivity.length !== 0) {
			const countGeoLocation = geolocationActivity.map((gl) => gl.countLocation).reduce((a, b) => a + b)
			const avgLat =
				geolocationActivity.map((gl) => gl.lat * gl.countLocation).reduce((a, b) => a + b) / countGeoLocation
			const avgLng =
				geolocationActivity.map((gl) => gl.lng * gl.countLocation).reduce((a, b) => a + b) / countGeoLocation
			return [ avgLng, avgLat ]
		} else {
			return [ 106, 16 ]
		}
	}

	const { geolocationActivity } = useSelector(deviceActivitySelector)
	const [ visible, setVisible ] = useState(false)
	const [ defaultCenter, setDefaultCenter ] = useState(calculateDefaultCenter())
	const [ defaultZoom, setDefaultZoom ] = useState(calculateZoomFactor())

	const getOption = () => {
		return {
			tooltip: {
				trigger: 'item'
			},
			// load gmap component
			gmap: {
				// initial options of Google Map
				// See https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions for details
				// initial map center, accepts an array like [lng, lat] or an object like { lng, lat }
				center: defaultCenter,
				// initial map zoom
				zoom: defaultZoom,
				// whether echarts layer should be rendered when the map is moving. Default is true.
				// if false, it will only be re-rendered after the map `moveend`.
				// It's better to set this option to false if data is large.
				renderOnMoving: true,
				// the zIndex of echarts layer for Google Map, default value is 2000.
				echartsLayerZIndex: 2020,
				fullscreenControl: false,
				zoomControl: false,
				streetViewControl: false
			},
			series: [
				{
					type: 'effectScatter',
					// use `gmap` as the coordinate system
					coordinateSystem: 'gmap',
					// data items [[lng, lat, value], [lng, lat, value], ...]
					data:
						geolocationActivity.length !== 0
							? geolocationActivity.map((gl) => [ gl.lng, gl.lat, gl.countLocation ])
							: [],
					encode: {
						// encode the third element of data item as the `value` dimension
						value: 2,
						lng: 0,
						lat: 1
					},
					symbolSize: function(val) {
						return val[2] * defaultZoom * 0.5
					},
					showEffectOn: 'render',
					rippleEffect: {
						brushType: 'stroke'
					},
					hoverAnimation: true,
					label: {
						formatter: '{b}',
						position: 'right',
						show: true
					}
				}
			]
		}
	}

	const handleOnClick = (e) => {
		const newCoor = [ parseFloat(e.data[0]), parseFloat(e.data[1]) ]
		if (defaultCenter[0] !== newCoor[0] && defaultCenter[1] !== newCoor[1]) {
			setDefaultCenter(newCoor)
		}
		setDefaultZoom((old) => old + 2)
	}

	const handleRollBack = () => {
		setDefaultCenter(calculateDefaultCenter())
		setDefaultZoom(calculateZoomFactor())
	}

	const handleToggleVisible = () => {
		setVisible((old) => !old)
	}

	return (
		<React.Fragment>
			<Card
				title={geolocationActivity.length !== 0 ? 'Geolocation Activity' : 'Geolocation Activity - No records'}
				headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
				hoverable={true}
				className="w-full h-full"
				extra={
					<React.Fragment>
						<button onClick={handleRollBack}>
							<RollbackOutlined className="text-xl" />
						</button>
						<span className="mx-2">|</span>
						<button onClick={handleToggleVisible}>
							{visible ? (
								<FullscreenExitOutlined className="text-xl" />
							) : (
								<FullscreenOutlined className="text-xl" />
							)}
						</button>
					</React.Fragment>
				}
			>
				<ReactEchartsCore
					echarts={echarts}
					option={getOption()}
					onEvents={{
						click: handleOnClick
					}}
				/>
			</Card>
			<Modal
				title={geolocationActivity.length !== 0 ? 'Geolocation Activity' : 'Geolocation Activity - No records'}
				visible={visible}
				onOk={handleToggleVisible}
				onCancel={handleToggleVisible}
				centered
				width={1000}
				height={800}
				footer={[
					<button onClick={handleRollBack}>
						<RollbackOutlined className="text-xl" />
					</button>
				]}
			>
				<ReactEchartsCore
					echarts={echarts}
					option={getOption()}
					style={{ height: '600px' }}
					onEvents={{
						click: handleOnClick
					}}
				/>
			</Modal>
		</React.Fragment>
	)
})
