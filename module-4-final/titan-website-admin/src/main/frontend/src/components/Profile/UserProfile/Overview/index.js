import React, { useEffect } from 'react';
import { Row, Col, BackTop, Skeleton } from 'antd';
import { UpCircleFilled } from '@ant-design/icons';
import Score from './Score';
import Basic from './Basic';
import Identity from './Identity';
import IP from './IP';
import { useDispatch, useSelector } from 'react-redux';
import { generalSelector } from '../../../../slices/general';
import { fetchUser, userSelector } from '../../../../slices/user';

export default React.memo(() => {
	const dispatch = useDispatch();
	const { id } = useSelector(generalSelector);
	const { loading, hasErrors, errorInfo } = useSelector(userSelector);
	useEffect(
		() => {
			dispatch(fetchUser(id));
		},
		[ dispatch, id ]
	);

	return !loading && !hasErrors ? (
		<div className="animated fadeIn text-gray-700">
			<Row gutter={[ 24, 24 ]}>
				<Col span={24}>
					<Score />
				</Col>
			</Row>
			<Row gutter={[ 24, 24 ]}>
				<Col span={12}>
					<Basic />
				</Col>

				<Col span={12}>
					<Row gutter={[ 24, 24 ]}>
						<Col span={24}>
							<Identity />
						</Col>
					</Row>
					<Row>
						<Col span={24}>{/* <IP /> */}</Col>
					</Row>
				</Col>
			</Row>

			<BackTop>
				<UpCircleFilled style={{ fontSize: '30px', color: '#3498db' }} />
			</BackTop>
		</div>
	) : (
		<Skeleton active />
	);
});
