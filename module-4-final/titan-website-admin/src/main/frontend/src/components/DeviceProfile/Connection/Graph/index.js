import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import ReactEcharts from 'echarts-for-react'
import { deviceConnectionSelector, fetchMoreConnection } from '../../../../slices/deviceConnection'
import { Card } from 'antd'
import { useDispatch } from 'react-redux'

export default React.memo(({ setCurrentChosenDevice }) => {
	const dispatch = useDispatch()
	const { loading, graphData } = useSelector(deviceConnectionSelector)
	const ref = useRef()

	const handleOnClick = async (e) => {
		if (e.data.type === 'device') {
			setCurrentChosenDevice(e.data.id)
		}
	}

	const handleDoubleClick = async (e) => {
		if (e.data.type === 'device') {
			dispatch(fetchMoreConnection(e.data.id))
		}
	}
	console.log(ref)

	return (
		<div className="animated fadeIn">
			<Card
				className="w-full"
				title="Device Depth 2-3"
				headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
				loading={loading}
				hoverable={true}
			>
				<ReactEcharts
					ref={ref}
					option={graphData}
					style={{ height: '800px', width: '100%' }}
					className="react_for_echarts"
					onEvents={{
						click: handleOnClick,
						dblclick: handleDoubleClick
					}}
				/>
			</Card>
		</div>
	)
})
