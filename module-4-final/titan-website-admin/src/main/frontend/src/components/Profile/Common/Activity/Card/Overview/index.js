import React, { useState, useEffect } from 'react'
import { Modal, Skeleton, Empty } from 'antd'
import ReactEcharts from 'echarts-for-react'

export default React.memo(({ id, filters }) => {
	const [ visible, setVisible ] = useState(false)
	const [ option, setOption ] = useState(null)
	const [ noData, setNoData ] = useState(false)

	useEffect(
		() => {
			const fetchStatusActivity = async () => {
				const response = await fetch('http://localhost:8085/api/user_device/test', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						query: `FOR v, e IN 1..1 ANY @id user_card_account
								FILTER TO_NUMBER(e.reqDate) >= DATE_TIMESTAMP(@fromDate) AND TO_NUMBER(e.reqDate) <= DATE_TIMESTAMP(@toDate)
								COLLECT status = e.requestStatus WITH COUNT INTO status_count
								SORT status_count DESC
								RETURN {status, status_count}`,
						bindVars: {
							id: id,
							fromDate: filters.range[0],
							toDate: filters.range[1]
						}
					})
				})

				const data = await response.json()
				if (data && data.length > 0) {
					setNoData(false)
					setOption(getOption(data))
				} else {
					setNoData(true)
				}
			}
			fetchStatusActivity()
		},
		[ id, filters ]
	)
	const getOption = (data) => {
		if (data.length > 0) {
			// const preprocessedStatus = preprocessStatus(status)
			return {
				tooltip: {
					trigger: 'item',
					formatter: '{b} : {c} ({d}%)'
				},
				toolbox: {
					show: true,
					feature: {
						saveAsImage: {
							title: 'Save',
							name: 'device_merchant_general'
						},
						restore: {
							show: true,
							title: 'Restore'
						},
						myFeature: {
							show: true,
							title: 'Zoom In',
							icon: `image://${process.env.PUBLIC_URL + '/assets/icon/fullscreen.png'}`,
							onclick: () => {
								handleToggleVisible()
							}
						}
					}
				},
				series: [
					{
						type: 'pie',
						selectedMode: 'multiple',
						// data: Object.keys(preprocessedStatus).map((mf) => ({
						// 	name: `${mf} - ${preprocessedStatus[mf]}`,
						// 	value: preprocessedStatus[mf]
						// })),
						data: data.map((s) => ({
							name: s.status,
							value: s.status_count
						})),
						animation: true,
						label: {
							position: 'outside',
							alignTo: 'none',
							bleedMargin: 5
						}
					}
				],
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		}
	}

	const handleToggleVisible = () => {
		setVisible((old) => !old)
	}

	return noData ? (
		<Empty />
	) : option ? (
		<React.Fragment>
			<ReactEcharts
				theme={'infographic'}
				style={{ height: '35vh' }}
				option={option}
				notMerge={true}
				lazyUpdate={true}
			/>

			<Modal
				title="Mapping Status"
				visible={visible}
				onOk={handleToggleVisible}
				onCancel={handleToggleVisible}
				centered
				width={1000}
				footer={null}
				renderer="canvas"
			>
				<ReactEcharts
					theme={'infographic'}
					lazyUpdate={true}
					style={{ height: '35vh' }}
					option={option}
					renderer="canvas"
					style={{ height: '70vh', width: '100%' }}
				/>
			</Modal>
		</React.Fragment>
	) : (
		<Skeleton active />
	)
})
