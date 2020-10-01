import React from 'react'
import { Row, Col, Skeleton, BackTop } from 'antd'
import { UpCircleFilled } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { generalSelector } from '../../../../slices/general'
import Monetary from '../../Common/Activity/Monetary'
import Geolocation from '../../Common/Activity/Geolocation'
import { storeDateRange, userSelector } from '../../../../slices/user'
import FilterBar from '../../Common/Activity/FilterBar'
import Merchant from '../../Common/Activity/Merchant'
import Card from '../../Common/Activity/Card'

export default () => {
	const { loading, hasErrors, filters } = useSelector(userSelector)
	const { id, type } = useSelector(generalSelector)

	return (
		<div className="animated fadeIn">
			<Row gutter={[ 24, 24 ]}>
				<Col span={24}>
					<FilterBar filters={filters} storeDateRange={storeDateRange} />
				</Col>
			</Row>
			{!loading && !hasErrors ? (
				<React.Fragment>
					<Row gutter={[ 24, 24 ]}>
						<Col span={12}>
							<Card id={`${type}/${id}`} filters={filters} />
						</Col>
						<Col span={12}>
							<Merchant id={`${type}/${id}`} filters={filters} />
						</Col>
					</Row>
					<Row gutter={[ 24, 24 ]}>
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
}
