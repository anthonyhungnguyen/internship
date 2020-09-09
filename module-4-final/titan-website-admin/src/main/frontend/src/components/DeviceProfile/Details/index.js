import React, { useEffect } from 'react'
import { Row, Col } from 'reactstrap'
import { useDispatch } from 'react-redux'
import './index.css'
import Score from './Score'
import System from './System'
import Identity from './Identity'
import IP from './IP'
import { fetchDevice } from '../../../slices/device'

export default () => {
	const dispatch = useDispatch()
	useEffect(
		() => {
			dispatch(fetchDevice('EDF10704-E7E4-4CC6-BA25-9A30C7720D02'))
		},
		[ dispatch ]
	)
	return (
		<div className="animated fadeIn text-gray-700">
			<Score />
			<Row>
				<Col xs={6}>
					<System />
				</Col>

				<Col xs={6}>
					<Identity />
					<IP />
				</Col>
			</Row>
		</div>
	)
}
