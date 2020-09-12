import React from 'react'
import { Row, Col, Skeleton, BackTop } from 'antd'
import { UpCircleFilled } from '@ant-design/icons'
import Score from './Score'
import System from './System'
import Identity from './Identity'
import IP from './IP'

export default () => {
	return (
		<div className="animated fadeIn text-gray-700">
			<Row gutter={[ 24, 24 ]}>
				<Col span={24}>
					<Score />
				</Col>
			</Row>
			<Row gutter={[ 24, 24 ]}>
				<Col span={12}>
					<System />
				</Col>

				<Col span={12}>
					<Row gutter={[ 24, 24 ]}>
						<Col span={24}>
							<Identity />
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<IP />
						</Col>
					</Row>
				</Col>
			</Row>

			<BackTop>
				<UpCircleFilled style={{ fontSize: '30px', color: '#3498db' }} />
			</BackTop>
		</div>
	)
}
