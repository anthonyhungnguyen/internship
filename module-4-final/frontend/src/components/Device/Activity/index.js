import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchActivity } from '../../../slices/user_device'
import moment from 'moment'

import { userDeviceSelector } from '../../../slices/user_device'
import { deviceSelector } from '../../../slices/device'
import ActiveFrequency from './ActiveFrequency'

const Activity = () => {
    const dispatch = useDispatch()
    const { deviceId } = useSelector(deviceSelector)
    const { timestamps } = useSelector(userDeviceSelector)

    useEffect(() => {
        dispatch(fetchActivity(deviceId))
        convertDateTimeToFrequency(timestamps)
    }, [dispatch, deviceId])
    const convertDateTimeToFrequency = (timestamps) => {
        const results = {}
        timestamps.forEach(ts => {
            const onlyDate = moment(ts).format('DD-MM-YYYY')
            if (onlyDate in results) {
                results[onlyDate] += 1
            } else {
                results[onlyDate] = 1
            }
        })
        const data = Object.entries(results).map((e) => ({ "date": e[0], "count": e[1] }))
        return <ActiveFrequency data={data} />
    }
    return (
        <div className="flex justify-center items-center flex-col">
            <p className="text-2xl font-bold">Active Date Frequency</p>
            {convertDateTimeToFrequency(timestamps)}
        </div>
    )
}

export default Activity