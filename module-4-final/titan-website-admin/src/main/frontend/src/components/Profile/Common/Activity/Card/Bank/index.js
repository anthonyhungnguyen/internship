import React, { useEffect, useState } from 'react'
import { Empty, Modal, Skeleton } from 'antd'
import ReactEcharts from 'echarts-for-react'

export default React.memo(({ id, filters }) => {
	const [ visible, setVisible ] = useState(false)
	const [ option, setOption ] = useState(null)
	const [ noData, setNoData ] = useState(false)

	useEffect(
		() => {
			const fetchBankActivity = async () => {
				const response = await fetch('http://localhost:8085/api/user_device/test', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						query: `FOR v,e IN 1..1 ANY @id user_card_account
								FILTER TO_NUMBER(e.reqDate) >= DATE_TIMESTAMP(@fromDate) AND TO_NUMBER(e.reqDate) <= DATE_TIMESTAMP(@toDate)
								COLLECT bName = e.bankname, status = e.requestStatus WITH count INTO status_count 
								RETURN {bName, status, status_count}`,
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
			fetchBankActivity()
		},
		[ id, filters ]
	)

	const processBank = (bank) => {
		const result = []
		const allBanks = [ ...new Set(bank.map((b) => b.bName)) ]
		allBanks.forEach((b) => {
			const everyBank = { name: b }
			let success = 0
			let fail = 0
			bank.filter((eb) => eb.bName === b).forEach((eb) => {
				if (eb.status > 0) {
					success += eb.status_count
				} else {
					fail += eb.status_count
				}
			})
			everyBank['success'] = success
			everyBank['fail'] = fail
			result.push(everyBank)
		})
		result.sort((a, b) => a.success + a.fail - b.success - b.fail)
		return result
	}
	const getOption = (data) => {
		if (data.length > 0) {
			const result = processBank(data)
			return {
				tooltip: {
					trigger: 'item',
					formatter: '{b} : {c}'
				},
				legend: {
					data: [ 'Success', 'Fail' ]
				},
				grid: {
					bottom: 80
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					}
				},
				dataZoom: [
					{
						type: 'slider',
						xAxisIndex: [ 0 ],
						show: true,
						start: 70
					},
					{
						type: 'inside',
						show: true,
						xAxisIndex: [ 0 ]
					}
				],
				xAxis: [
					{
						type: 'category',
						name: 'Bank',
						data: result.map((r) => r.name),
						axisLabel: {
							interval: 0,
							rotate: -30
						}
					}
				],
				yAxis: [
					{
						name: 'Frequency',
						type: 'value',
						scale: true,
						min: 0
					}
				],
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
						name: 'Success',
						type: 'bar',
						stack: 'one',
						data: result.map((r) => r.success),
						label: {
							show: true
						},
						markLine: {
							data: [ { type: 'average', name: 'average' } ]
						}
					},
					{
						name: 'Fail',
						type: 'bar',
						stack: 'one',
						data: result.map((r) => r.fail),
						label: {
							show: true
						},
						markLine: {
							data: [ { type: 'average', name: 'average' } ]
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
					style={{ height: '35vh' }}
					lazyUpdate={true}
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
