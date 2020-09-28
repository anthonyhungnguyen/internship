import React, { Suspense, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Input, Tabs, Skeleton, message, Button, Drawer } from 'antd'
import { deviceSelector } from '../../../slices/device'
import { generalSelector, storeId } from '../../../slices/general'

const { TabPane } = Tabs

const { Search } = Input

const Details = React.lazy(() => import('./Details'))
const Activity = React.lazy(() => import('./Activity'))
const Connection = React.lazy(() => import('./Connection'))
const Tool = React.lazy(() => import('./Tool'))

export default React.memo(() => {
	const [ activeTab, setActiveTab ] = useState('overview')
	const { id, hasErrors } = useSelector(generalSelector)
	const { loading } = useSelector(deviceSelector)
	const dispatch = useDispatch()

	const handleSearch = (newDeviceId) => {
		if (newDeviceId) {
			dispatch(storeId(newDeviceId))
		} else {
			message.error({
				content: 'ID Not Found',
				style: {
					marginTop: '5vh'
				}
			})
		}
	}
	const [ visible, setVisible ] = useState(false)
	const showDrawer = () => {
		setVisible(true)
	}
	const onClose = () => {
		setVisible(false)
	}

	return (
		<Tabs
			defaultActiveKey={activeTab}
			animated={true}
			onChange={(e) => setActiveTab(e)}
			type="card"
			tabBarExtraContent={
				<React.Fragment>
					<Search
						addonBefore="Device"
						defaultValue={id}
						placeholder="input device id"
						onSearch={handleSearch}
						size="large"
						enterButton
						loading={loading}
					/>
				</React.Fragment>
			}
		>
			{!hasErrors ? (
				<React.Fragment>
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
				</React.Fragment>
			) : (
				<Skeleton active />
			)}
		</Tabs>
	)
})
