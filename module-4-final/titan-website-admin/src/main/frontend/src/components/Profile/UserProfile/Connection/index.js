import React, { useEffect, useState, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, BackTop, Skeleton } from 'antd';
import { UpCircleFilled } from '@ant-design/icons';
import { generalSelector } from '../../../../slices/general';
import { userSelector, fetchConnection } from '../../../../slices/user';

const Graph = React.lazy(() => import('./Graph'));
const Device = React.lazy(() => import('./Brief/Device'));
const User = React.lazy(() => import('./Brief/User'));

export default React.memo(() => {
	const dispatch = useDispatch();
	const { id, type } = useSelector(generalSelector);
	const { loading, hasErrors } = useSelector(userSelector);
	const [ currentChosenId, setCurrentChosenId ] = useState(id);
	const [ currentType, setCurrentType ] = useState(type);
	const [ currentLoading, setCurrentLoading ] = useState(false);

	useEffect(
		() => {
			dispatch(fetchConnection(id, 1));
		},
		[ dispatch, id ]
	);

	useEffect(
		() => {
			const fetchType = async () => {
				setCurrentLoading(true);
				const response = await fetch('http://localhost:8085/api/user_device/test', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						query: `LET checkList = ["devices/", "users/"]

								FOR cl IN checkList
									RETURN {type: cl, isnull: IS_NULL(DOCUMENT(CONCAT(cl, @id)))}`,
						bindVars: {
							id: currentChosenId
						}
					})
				});
				const data = await response.json();
				const idType = data.filter((x) => !x.isnull);
				const type = idType[0].type.replace('s/', '');
				setCurrentType(type);
				setCurrentLoading(false);
			};
			if (!loading && !hasErrors) {
				fetchType();
			}
		},
		[ currentChosenId ]
	);
	return !loading && !hasErrors ? (
		<React.Fragment>
			<Row gutter={[ 24, 24 ]}>
				<Col span={16}>
					<Suspense fallback={<Skeleton active />}>
						<Suspense fallback={<Skeleton active />}>
							<Graph setCurrentChosenId={setCurrentChosenId} id={id} />
						</Suspense>
					</Suspense>
				</Col>
				<Col span={8}>
					{!currentLoading ? (
						<Suspense fallback={<Skeleton active />}>
							{currentType === 'device' && <Device id={currentChosenId} />}
							{currentType === 'user' && <User id={currentChosenId} />}
						</Suspense>
					) : (
						<Skeleton active />
					)}
				</Col>
			</Row>

			<BackTop>
				<UpCircleFilled style={{ fontSize: '30px', color: '#3498db' }} />
			</BackTop>
		</React.Fragment>
	) : (
		<Skeleton active />
	);
});
