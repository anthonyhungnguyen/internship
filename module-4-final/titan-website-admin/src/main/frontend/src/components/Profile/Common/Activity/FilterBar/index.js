import { DatePicker } from "antd"
import moment from "moment"
import React, { memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { generalSelector, storeDateRange } from "../../../../../slices"
const { RangePicker } = DatePicker

export default memo(function FilterBar() {
    const { filters } = useSelector(generalSelector)
    const dispatch = useDispatch()

    const handleRangeChange = (_, dateStrings) => {
        if (!dateStrings.includes("")) {
            dispatch(storeDateRange(dateStrings))
        }
    }

    return (
        <React.Fragment>
            <p className='font-bold '>Timeline</p>
            <RangePicker
                format='YYYY-MM-DD'
                className='w-full'
                onCalendarChange={handleRangeChange}
                defaultValue={[
                    moment(filters.range[0], "YYYY-MM-DD"),
                    moment(filters.range[1], "YYYY-MM-DD"),
                ]}
            />
        </React.Fragment>
    )
})
