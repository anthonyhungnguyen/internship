import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deviceConnectionSelector, preprocessConnection } from '../../../../slices/device_connection'
import { useEffect } from 'react'
import ReactEcharts from 'echarts-for-react'
import { deviceSelector } from '../../../../slices/device'

export default React.memo(({ setCurrentChosenDevice }) => {
	const dispatch = useDispatch()
	const { loading, connections, data } = useSelector(deviceConnectionSelector)
	const { deviceId } = useSelector(deviceSelector)

	useEffect(
		() => {
			dispatch(preprocessConnection(deviceId, connections))
		},
		[ dispatch, connections, deviceId ]
	)

	const getOption = () => {
		const connectionsData = {
			type: 'force',
			categories: [
				{
					name: 'Root Device'
				},
				{
					name: 'Users'
				},
				{
					name: 'Related Devices'
				}
			],
			nodes: data.nodes,
			links: data.links
		}
		const options = {
			title: {
				text: 'Device Depth 2'
			},
			legend: {
				data: [ 'Root Device', 'Users', 'Related Devices' ]
			},
			series: [
				{
					type: 'graph',
					layout: 'force',
					animation: true,
					label: {
						normal: {
							show: true,
							position: 'top',
							formatter: '{b}'
						}
					},
					draggable: true,
					data: connectionsData.nodes,
					categories: connectionsData.categories,
					force: {
						edgeLength: 80,
						repulsion: 600,
						friction: 0.2
					},
					edges: connectionsData.links,
					roam: true,
					symbolSize: 15
				}
			]
		}
		return options
	}

	const handleOnClick = async (e) => {
		if (e.data.type === 'device') {
			const response = await fetch(`http://localhost:8085/api/device/${e.data.id}`)
			const data = await response.json()
			setCurrentChosenDevice(data)
		}
	}

	return !loading ? (
		<ReactEcharts
			option={getOption()}
			style={{ height: '100vh', width: '66.7%' }}
			className="react_for_echarts"
			onEvents={{
				click: handleOnClick
			}}
		/>
	) : null
})
