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
import Statistics from '../../Common/Activity/Statistics'

export default () => {
	const { loading, hasErrors, filters } = useSelector(userSelector)
	const { id, type } = useSelector(generalSelector)

	return (
		<div className="animated fadeIn">
			{!loading && !hasErrors ? (
				<React.Fragment>
					<Row gutter={[ 12, 12 ]}>
						<Col span={24}>
							<Statistics
								id={id}
								filters={filters}
								queryUrl="http://localhost:8085/api/profile/user/"
								queryParams={{
									id: `userid/${id}`,
									fromDate: filters.range[0],
									toDate: filters.range[1]
								}}
							/>
						</Col>
						<Col span={12}>
							<Row gutter={[ 12, 12 ]}>
								<Col span={24}>
									<Card
										id={id}
										filters={filters}
										queryUrl="http://localhost:8085/api/profile/user/"
										queryParams={{
											id: `userid/${id}`,
											fromDate: filters.range[0],
											toDate: filters.range[1]
										}}
									/>
								</Col>
							</Row>

							<Row gutter={[ 12, 12 ]}>
								<Col span={24}>
									<Monetary id={id} type={type} filters={filters} />
								</Col>
							</Row>
							<Row />
						</Col>
						<Col span={12}>
							<Row gutter={[ 12, 12 ]}>
								<Col span={24}>
									<Merchant id={id} type={type} filters={filters} />
								</Col>
							</Row>

							<Row gutter={[ 12, 12 ]}>
								<Col span={24}>
									<Geolocation id={id} type={type} filters={filters} />
								</Col>
							</Row>
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
