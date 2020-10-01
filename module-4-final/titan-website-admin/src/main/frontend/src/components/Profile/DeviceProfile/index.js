import React, { Suspense, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Input, Tabs, Skeleton, message, Select } from 'antd'
import { deviceSelector } from '../../../slices/device'
import { generalSelector, storeId, storeType } from '../../../slices/general'

const { TabPane } = Tabs
const { Option } = Select
const { Search } = Input

const Details = React.lazy(() => import('./Details'))
const Activity = React.lazy(() => import('./Activity'))
const Connection = React.lazy(() => import('./Connection'))
const Tool = React.lazy(() => import('../Common/Tool'))

export default React.memo(() => {
	const [ activeTab, setActiveTab ] = useState('overview')
	const { id, hasErrors } = useSelector(generalSelector)
	const { loading } = useSelector(deviceSelector)
	const [ typeSelect, setTypeSelect ] = useState('devices')
	const [ currentID, setCurrentID ] = useState(id)
	const dispatch = useDispatch()

	const handleTypeChange = (type) => {
		setCurrentID('')
		setTypeSelect(type)
	}

	const handleIDChange = (e) => {
		setCurrentID(e.target.value)
	}

	const handleSearch = (newId) => {
		if (newId) {
			dispatch(storeType(typeSelect))
			dispatch(storeId(newId))
		} else {
			message.error({
				content: 'ID Not Found',
				style: {
					marginTop: '5vh'
				}
			})
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
					addonBefore={
						<Select defaultValue={typeSelect} style={{ width: 100 }} onChange={handleTypeChange}>
							<Option value="devices">Device</Option>
							<Option value="users">User</Option>
							<Option value="cards">Card</Option>
						</Select>
					}
					value={currentID}
					defaultValue={currentID}
					placeholder="enter id here"
					onChange={handleIDChange}
					onSearch={handleSearch}
					size="large"
					enterButton
					loading={loading}
				/>
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
