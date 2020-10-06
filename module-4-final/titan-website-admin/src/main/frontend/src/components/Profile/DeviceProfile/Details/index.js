import React, { useEffect } from 'react'
import { Row, Col, BackTop, Skeleton, Empty } from 'antd'
import { UpCircleFilled } from '@ant-design/icons'
import Score from './Score'
import System from './System'
import Identity from './Identity'
import IP from './IP'
import { deviceSelector, fetchDevice } from '../../../../slices/device'
import { useDispatch, useSelector } from 'react-redux'
import { generalSelector } from '../../../../slices/general'

export default React.memo(() => {
	const dispatch = useDispatch()
	const { id, exist } = useSelector(generalSelector)
	const { loading, hasErrors, errorInfo } = useSelector(deviceSelector)
	useEffect(
		() => {
			dispatch(fetchDevice(id))
		},
		[ dispatch, id, exist ]
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
						<Col span={12}>
							<System />
						</Col>

						<Col span={12}>
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
