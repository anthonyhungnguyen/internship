import React, { useState, Suspense } from 'react';
import { Input, Tabs, Skeleton } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { generalSelector, storeId } from '../../../slices/general';

const { TabPane } = Tabs;
const { Search } = Input;

const Activity = React.lazy(() => import('./Activity'));
const Connection = React.lazy(() => import('./Connection'));
const Overview = React.lazy(() => import('./Overview'));

export default () => {
	const { id, hasErrors } = useSelector(generalSelector);
	const [ activeTab, setActiveTab ] = useState('overview');
	const dispatch = useDispatch();

	const handleSearch = (newId) => {
		if (newId) {
			dispatch(storeId(newId));
		} else {
			swal('Error', 'Please re-check device ID', 'error');
		}
	};

	return (
		<Tabs
			defaultActiveKey={activeTab}
			animated={true}
			onChange={(e) => setActiveTab(e)}
			type="card"
			tabBarExtraContent={
				<Search
					addonBefore="User"
					defaultValue={id}
					placeholder="input user id"
					onSearch={handleSearch}
					size="large"
					enterButton
				/>
			}
		>
			{!hasErrors ? (
				<React.Fragment>
					<TabPane tab="Overview" key="overview">
						<Suspense fallback={<Skeleton active />}>
							<Overview />
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
						<Suspense fallback={<Skeleton active />} />
					</TabPane>
				</React.Fragment>
			) : (
				<Skeleton active />
			)}
		</Tabs>
	);
};
