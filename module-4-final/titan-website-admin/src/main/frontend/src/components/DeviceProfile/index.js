import React, { useState, Suspense } from 'react'
import { Input, Tabs, Skeleton } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { deviceSelector, storeDeviceId } from '../../slices/device'
import swal from 'sweetalert'
import './index.css'

const Details = React.lazy(() => import('./Details'))
const Activity = React.lazy(() => import('./Activity'))
const Connection = React.lazy(() => import('./Connection'))

const { TabPane } = Tabs
const { Search } = Input

export default React.memo(() => {
	const dispatch = useDispatch()
	const { deviceId, loading } = useSelector(deviceSelector)
	const [ activeTab, setActiveTab ] = useState('details')

	const handleSearch = (newDeviceId) => {
		if (newDeviceId) {
			dispatch(storeDeviceId(newDeviceId))
		} else {
			swal('Error', 'Please re-check device ID', 'error')
		}
	}

	return (
		<Tabs
			defaultActiveKey={activeTab}
			animated={true}
			onChange={(e) => setActiveTab(e)}
			type="card"
			tabBarExtraContent={
				<Search
					defaultValue={deviceId}
					placeholder="input device id"
					onSearch={handleSearch}
					size="large"
					enterButton
					loading={loading}
				/>
			}
		>
			<TabPane tab="Details" key="details">
				<Suspense fallback={<Skeleton active />}>
					<Details />
				</Suspense>
			</TabPane>
			<TabPane tab="Activity" key="activity">
				<Suspense fallback={<Skeleton active />}>
					<Activity />
				</Suspense>
			</TabPane>
			<TabPane tab="Connection" key="connection">
				<Suspense fallback={<Skeleton active />}>
					<Connection />
				</Suspense>
			</TabPane>
		</Tabs>
	)
})
