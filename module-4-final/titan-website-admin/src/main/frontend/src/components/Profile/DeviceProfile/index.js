import React, { Suspense, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Input, Tabs, Skeleton, message, Select, Drawer } from 'antd'
import { deviceSelector, storeDateRange } from '../../../slices/device'
import { generalSelector, storeId, storeType } from '../../../slices/general'
import FilterBar from '../Common/Activity/FilterBar'
import { SettingTwoTone } from '@ant-design/icons'

const { TabPane } = Tabs
const { Option } = Select
const { Search } = Input

const Details = React.lazy(() => import('./Details'))
const Activity = React.lazy(() => import('./Activity'))
const Connection = React.lazy(() => import('./Connection'))
const Tool = React.lazy(() => import('../Common/Tool'))

export default React.memo(() => {
	const [
		activeTab,
		setActiveTab
	] = useState('overview')
	const { id, hasErrors } = useSelector(generalSelector)
	const { loading, filters } = useSelector(deviceSelector)
	const [
		visible,
		setVisible
	] = useState(false)
	const [
		typeSelect,
		setTypeSelect
	] = useState('devices')
	const [
		currentID,
		setCurrentID
	] = useState(id)
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

	const showDrawer = () => {
		setVisible(true)
	}
	const onClose = () => {
		setVisible(false)
	}

	return (
		<React.Fragment>
			<Drawer title='Filter' placement='right' width={400} closable={false} onClose={onClose} visible={visible}>
				<FilterBar filters={filters} storeDateRange={storeDateRange} />
			</Drawer>
			<button
				style={{ position: 'fixed', top: '200px', right: '20px', fontSize: '30px', zIndex: '9999' }}
				onClick={showDrawer}
			>
				<SettingTwoTone />
			</button>
			<Tabs
				defaultActiveKey={activeTab}
				animated={true}
				onChange={(e) => setActiveTab(e)}
				type='card'
				tabBarExtraContent={
					<Search
						addonBefore={
							<Select defaultValue={typeSelect} style={{ width: 100 }} onChange={handleTypeChange}>
								<Option value='devices'>Device</Option>
								<Option value='users'>User</Option>
								<Option value='cards'>Card</Option>
							</Select>
						}
						value={currentID}
						defaultValue={currentID}
						placeholder='enter id here'
						onChange={handleIDChange}
						onSearch={handleSearch}
						size='large'
						enterButton
						loading={loading}
						allowClear={true}
					/>
				}
			>
				{!hasErrors ? (
					<React.Fragment>
						<TabPane tab='Overview' key='overview'>
							<Suspense fallback={<Skeleton active />}>
								<Details />
							</Suspense>
						</TabPane>
						<TabPane tab='Activity' key='activity'>
							<Suspense fallback={<Skeleton active />}>
								<Activity />
							</Suspense>
						</TabPane>
						<TabPane tab='Connection' key='connection'>
							<Suspense fallback={<Skeleton active />}>
								<Connection />
							</Suspense>
						</TabPane>
						<TabPane tab='Tool' key='tool'>
							<Suspense fallback={<Skeleton active />}>
								<Tool />
							</Suspense>
						</TabPane>
					</React.Fragment>
				) : (
					<Skeleton active />
				)}
			</Tabs>
		</React.Fragment>
	)
})
