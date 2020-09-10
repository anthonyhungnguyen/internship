import React from 'react'
import { useSelector } from 'react-redux'
import ReactEcharts from 'echarts-for-react'
import { deviceConnectionSelector, fetchMoreConnection } from '../../../../slices/deviceConnection'
import { Skeleton, Card } from 'antd'
import { useDispatch } from 'react-redux'

export default React.memo(({ setCurrentChosenDevice }) => {
	const dispatch = useDispatch()
	const { loading, graphData } = useSelector(deviceConnectionSelector)

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

	return !loading ? (
		<div className="animated fadeIn">
			<Card className="w-full" title="Device Depth 2-3">
				<ReactEcharts
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
	) : (
		<Skeleton active />
	)
})
