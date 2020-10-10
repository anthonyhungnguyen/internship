import React from 'react'
import { DatePicker } from 'antd'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { storeDateRange } from '../../../../../slices/user'
const { RangePicker } = DatePicker

export default React.memo(({ filters }) => {
	const dispatch = useDispatch()

	const handleRangeChange = (_, dateStrings) => {
		if (!dateStrings.includes('')) {
			dispatch(storeDateRange(dateStrings))
		}
	}

	return (
		<React.Fragment>
			<p className="font-bold ">Timeline</p>
			<RangePicker
				format="YYYY-MM-DD"
				className="w-full"
				onCalendarChange={handleRangeChange}
				defaultValue={[ moment(filters.range[0], 'YYYY-MM-DD'), moment(filters.range[1], 'YYYY-MM-DD') ]}
			/>
		</React.Fragment>
	)
})
