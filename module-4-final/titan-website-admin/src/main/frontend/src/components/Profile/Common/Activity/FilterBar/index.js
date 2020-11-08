import { Col, DatePicker, Divider, Row, Switch } from "antd"
import moment from "moment"
import React, { memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    generalSelector,
    storeDateRange,
    storeUseGPU,
} from "../../../../../slices"
const { RangePicker } = DatePicker

export default memo(function FilterBar() {
    const { filters } = useSelector(generalSelector)
    const dispatch = useDispatch()

    const handleRangeChange = (_, dateStrings) => {
        if (!dateStrings.includes("")) {
            dispatch(storeDateRange(dateStrings))
        }
    }

    const handleToggleUseCPU = (e) => {
        dispatch(storeUseGPU(e))
    }

    return (
        <React.Fragment>
            <p className='font-bold text-xl'>Timeline</p>
            <RangePicker
                format='YYYY-MM-DD'
                className='w-full'
                onCalendarChange={handleRangeChange}
                defaultValue={[
                    moment(filters.range[0], "YYYY-MM-DD"),
                    moment(filters.range[1], "YYYY-MM-DD"),
                ]}
            />
            <Divider />
            <p className='font-bold text-xl'>Graph</p>
            <Row>
                <Col span={12} className='font-bold'>
                    Use GPU
                </Col>
                <Col span={12}>
                    <Switch onChange={handleToggleUseCPU} />
                </Col>
            </Row>
        </React.Fragment>
    )
})
