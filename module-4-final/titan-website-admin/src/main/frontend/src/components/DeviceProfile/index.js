import React, { useState, Suspense, useEffect } from 'react'
import { Input, Tabs, Skeleton } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { deviceSelector, storeDeviceId } from '../../slices/device'
import './index.css'

const Details = React.lazy(() => import('./Details'))
const Activity = React.lazy(() => import('./Activity'))
const Connection = React.lazy(() => import('./Connection'))

const { TabPane } = Tabs
const { Search } = Input

export default React.memo(() => {
	const dispatch = useDispatch()
	const { deviceId, loading } = useSelector(deviceSelector)
	const [activeTab, setActiveTab] = useState('details')

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
					onSearch={(newDeviceId) => dispatch(storeDeviceId(newDeviceId))}
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
