import React, { Suspense, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Input, Tabs, Skeleton } from 'antd'
import { deviceSelector, storeDeviceId } from '../../../slices/device'
import swal from 'sweetalert'
import { generalSelector, storeId } from '../../../slices/general'

const { TabPane } = Tabs

const { Search } = Input

const Details = React.lazy(() => import('./Details'))
const Activity = React.lazy(() => import('./Activity'))
const Connection = React.lazy(() => import('./Connection'))
const Tool = React.lazy(() => import('./Tool'))

export default React.memo(() => {
	const [ activeTab, setActiveTab ] = useState('overview')
	const { id } = useSelector(generalSelector)
	const { loading } = useSelector(deviceSelector)
	const dispatch = useDispatch()

	const handleSearch = (newDeviceId) => {
		if (newDeviceId) {
			dispatch(storeId(newDeviceId))
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
					addonBefore="Device"
					defaultValue={id}
					placeholder="input device id"
					onSearch={handleSearch}
					size="large"
					enterButton
					loading={loading}
				/>
			}
		>
			<TabPane tab="Overview" key="overview">
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
			<TabPane tab="Tool" key="tool">
				<Suspense fallback={<Skeleton active />}>
					<Tool />
				</Suspense>
			</TabPane>
		</Tabs>
	)
})
