import React from 'react'
import { DatePicker, Card, Row, Col } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { deviceSelector, storeDateRange } from '../../../../../slices/device'
const { RangePicker } = DatePicker

export default () => {
	const dispatch = useDispatch()
	const { filters } = useSelector(deviceSelector)

	const handleRangeChange = (_, dateStrings) => {
		if (!dateStrings.includes('')) {
			dispatch(storeDateRange(dateStrings))
		}
	}

	return (
		<Card hoverable={true}>
			<Row align="middle">
				<Col span={8}>
					<p className="font-bold ">Timeline</p>
					<RangePicker
						format="YYYY-MM-DD"
						onCalendarChange={handleRangeChange}
						defaultValue={[
							moment(filters.range[0], 'YYYY-MM-DD'),
							moment(filters.range[1], 'YYYY-MM-DD')
						]}
					/>
				</Col>
			</Row>
		</Card>
	)
}
