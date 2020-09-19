import React, { useState } from 'react'
import Graph from './components/Graph'
import Toolbar from './components/Toolbar'
import { Row, Col } from 'antd'

export default () => {
	const [ id, setId ] = useState('0CA30A94-6251-4727-8340-9B6BE942AACB')
	const [ type, setType ] = useState('devices')
	return (
		<Row style={{ height: '100vh' }}>
			<Col span={18}>
				<Graph type={type} id={id} />
			</Col>
			<Col span={6}>
				<Toolbar setType={setType} setId={setId} />
			</Col>
		</Row>
	)
}
