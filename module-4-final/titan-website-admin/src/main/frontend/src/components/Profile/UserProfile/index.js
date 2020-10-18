import React, { useState, Suspense } from 'react'
import { Input, Tabs, Skeleton, Select, Drawer } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import swal from 'sweetalert'
import { generalSelector, storeId, storeType } from '../../../slices/general'
import { SettingTwoTone } from '@ant-design/icons'
import FilterBar from '../Common/Activity/FilterBar'
import { userSelector, storeDateRange } from '../../../slices/user'

const { TabPane } = Tabs
const { Option } = Select
const { Search } = Input

const Activity = React.lazy(() => import('./Activity'))
const Connection = React.lazy(() => import('./Connection'))
const Overview = React.lazy(() => import('./Overview'))
const Tool = React.lazy(() => import('../Common/Tool'))

export default () => {
	const { id, hasErrors } = useSelector(generalSelector)
	const { filters } = useSelector(userSelector)
	const [ activeTab, setActiveTab ] = useState('overview')
	const [ typeSelect, setTypeSelect ] = useState('users')
	const [ currentID, setCurrentID ] = useState(id)
	const [ visible, setVisible ] = useState(false)
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
			swal('Error', 'Please re-check device ID', 'error')
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
							<Select defaultValue='users' style={{ width: 100 }} onChange={handleTypeChange}>
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
						allowClear={true}
					/>
				}
			>
				{!hasErrors ? (
					<React.Fragment>
						<TabPane tab='Overview' key='overview'>
							<Suspense fallback={<Skeleton active />}>
								<Overview />
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
}
