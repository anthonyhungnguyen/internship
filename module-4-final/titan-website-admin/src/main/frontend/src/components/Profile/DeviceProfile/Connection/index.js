import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deviceSelector, fetchConnection } from '../../../../slices/device'
import { Row, Col, BackTop, Skeleton } from 'antd'
import { UpCircleFilled } from '@ant-design/icons'
import { generalSelector } from '../../../../slices/general'
import Device from '../../Common/Connection/Brief/Device'
import User from '../../Common/Connection/Brief/User'

import Card from '../../Common/Connection/Brief/Card'
import Graph from '../../Common/Connection/Graph'

export default React.memo(() => {
	const dispatch = useDispatch()
	const { id, type } = useSelector(generalSelector)
	const { loading, hasErrors, graphData } = useSelector(deviceSelector)
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
			<Row gutter={[ 12, 12 ]}>
				<Col span={16}>
					<Graph
						setCurrentType={setCurrentType}
						setCurrentChosenId={setCurrentChosenId}
						id={id}
						type={type}
					/>
				</Col>
				<Col span={8}>
					<React.Fragment>
						{currentType === 'devices' && <Device id={currentChosenId} type={type} />}
						{currentType === 'users' && <User id={currentChosenId} type={type} />}
						{currentType === 'card_account' && <Card id={currentChosenId} type={type} />}
					</React.Fragment>
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
