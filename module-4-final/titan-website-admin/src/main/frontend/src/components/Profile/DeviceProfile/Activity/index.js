import React from 'react'
import { BackTop, Row, Skeleton, Col } from 'antd'
import { UpCircleFilled } from '@ant-design/icons'
import { deviceSelector, storeDateRange } from '../../../../slices/device'
import { useSelector } from 'react-redux'
import './index.css'

import Monetary from '../../Common/Activity/Monetary'
import Geolocation from '../../Common/Activity/Geolocation'
import { generalSelector } from '../../../../slices/general'
import Frequency from '../../Common/Activity/Frequency'
import FilterBar from '../../Common/Activity/FilterBar'
import Merchant from '../../Common/Activity/Merchant'

export default React.memo(() => {
	const { loading, hasErrors, filters } = useSelector(deviceSelector)
	const { id, type } = useSelector(generalSelector)
	return (
		<div className="animated fadeIn">
			{!loading && !hasErrors ? (
				<React.Fragment>
					<Row gutter={[ 12, 12 ]}>
						<Col span={24}>
							<FilterBar filters={filters} storeDateRange={storeDateRange} />
						</Col>
					</Row>
					<Row gutter={[ 12, 12 ]}>
						<Col span={12}>
							<Frequency id={`${type}/${id}`} filters={filters} />
						</Col>
						<Col span={12}>
							<Merchant id={`${type}/${id}`} filters={filters} />
						</Col>
					</Row>
					<Row gutter={[ 12, 12 ]}>
						<Col span={12}>
							<Monetary id={`${type}/${id}`} filters={filters} />
						</Col>
						<Col span={12}>
							<Geolocation id={`${type}/${id}`} filters={filters} />
						</Col>
					</Row>
				</React.Fragment>
			) : (
				<Skeleton active />
			)}
			<BackTop>
				<UpCircleFilled style={{ fontSize: '30px', color: '#3498db' }} />
			</BackTop>
		</div>
	)
})
