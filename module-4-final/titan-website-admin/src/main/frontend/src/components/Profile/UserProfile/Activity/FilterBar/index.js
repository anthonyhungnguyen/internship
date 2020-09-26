import React from 'react'
import { DatePicker, Card, Row, Col } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { storeDateRange, userActivitySelector } from '../../../../../slices/userActivity'
const { RangePicker } = DatePicker

export default () => {
	const dispatch = useDispatch()
	const { filters } = useSelector(userActivitySelector)

	const handleRangeChange = (_, dateStrings) => {
		if (!dateStrings.includes('')) {
			dispatch(storeDateRange(dateStrings))
		}
	}

	return (
		<Card title="Filter Bar" headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }} hoverable={true}>
			<Row align="middle">
				<Col span={8}>
					<p className="font-bold ">Pick a range</p>
					<RangePicker
						format="YYYY-MM-DD"
						onCalendarChange={handleRangeChange}
						defaultValue={[
							moment(filters.range[0], 'YYYY-MM-DD'),
							moment(filters.range[1], 'YYYY-MM-DD')
						]}
						disabledDate={(current) => current >= moment(filters.range[1], 'YYYY-MM-DD')}
					/>
				</Col>
			</Row>
		</Card>
	)
}
