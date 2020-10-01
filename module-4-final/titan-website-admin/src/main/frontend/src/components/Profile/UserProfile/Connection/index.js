import React, { useEffect, useState, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, BackTop, Skeleton } from 'antd'
import { UpCircleFilled } from '@ant-design/icons'
import { generalSelector } from '../../../../slices/general'
import { userSelector, fetchConnection } from '../../../../slices/user'
import Device from '../../Common/Connection/Brief/Device'
import User from '../../Common/Connection/Brief/User'
import Card from '../../Common/Connection/Brief/Card'
import Graph from '../../Common/Connection/Graph'

export default React.memo(() => {
	const dispatch = useDispatch()
	const { id, type } = useSelector(generalSelector)
	const { loading, hasErrors, graphData } = useSelector(userSelector)
	const [ currentChosenId, setCurrentChosenId ] = useState(id)
	const [ currentType, setCurrentType ] = useState(type)

	useEffect(
		() => {
			dispatch(fetchConnection(id, 1))
		},
		[ dispatch, id ]
	)

	return !loading && !hasErrors ? (
		<React.Fragment>
			<Row gutter={[ 24, 24 ]}>
				<Col span={16}>
					<Graph
						setCurrentType={setCurrentType}
						setCurrentChosenId={setCurrentChosenId}
						id={id}
						type={type}
						graphData={graphData}
					/>
				</Col>
				<Col span={8}>
					{currentType === 'devices' && <Device id={currentChosenId} />}
					{currentType === 'users' && <User id={currentChosenId} />}
					{currentType === 'card_account' && <Card id={currentChosenId} />}
				</Col>
			</Row>

			<BackTop>
				<UpCircleFilled style={{ fontSize: '30px', color: '#3498db' }} />
			</BackTop>
		</React.Fragment>
	) : (
		<Skeleton active />
	)
})
