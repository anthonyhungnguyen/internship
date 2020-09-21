import React, { useState } from 'react'
import Graph from './components/Graph'
import Toolbar from './components/Toolbar'
import { Row, Col } from 'antd'

export default () => {
	return (
		<Row style={{ height: '100vh' }}>
			<Col span={18}>
				<Graph />
			</Col>
			<Col span={6}>
				<Toolbar />
			</Col>
		</Row>
	)
}
