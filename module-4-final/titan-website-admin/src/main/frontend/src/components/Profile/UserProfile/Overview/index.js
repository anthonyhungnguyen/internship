import React, { useEffect } from 'react'
import { Row, Col, BackTop, Skeleton, Empty } from 'antd'
import { UpCircleFilled } from '@ant-design/icons'
import Score from './Score'
import Basic from './Basic'
import Identity from './Identity'
import IP from './IP'
import { useDispatch, useSelector } from 'react-redux'
import { generalSelector } from '../../../../slices/general'
import { fetchUser, userSelector } from '../../../../slices/user'

export default React.memo(() => {
	const dispatch = useDispatch()
	const { id, exist } = useSelector(generalSelector)
	const { loading, hasErrors, errorInfo } = useSelector(userSelector)
	useEffect(
		() => {
			if (exist) {
				dispatch(fetchUser(id))
			}
		},
		[ dispatch, id ]
	)

	return exist ? !loading && !hasErrors ? (
		<div className="animated fadeIn text-gray-700">
			{exist ? (
				<React.Fragment>
					<Row gutter={[ 12, 12 ]}>
						<Col span={24}>
							<Score />
						</Col>
					</Row>
					<Row gutter={[ 12, 12 ]}>
						<Col span={8}>
							<Basic />
						</Col>

						<Col span={16}>
							<Row gutter={[ 12, 12 ]}>
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
				</React.Fragment>
			) : (
				<Empty />
			)}
		</div>
	) : (
		<Skeleton active />
	) : (
		<Empty />
	)
})
