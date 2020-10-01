import React from 'react'
import { DatePicker, Card, Row, Col } from 'antd'
import { useDispatch } from 'react-redux'
import moment from 'moment'
const { RangePicker } = DatePicker

export default React.memo(({ filters, storeDateRange }) => {
	const dispatch = useDispatch()

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
})
