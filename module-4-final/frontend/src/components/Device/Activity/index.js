import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchActivity, deviceActivitySelector } from '../../../slices/device_activity'
import moment from 'moment'

import { deviceSelector } from '../../../slices/device'
import ActiveFrequency from './ActiveFrequency'

const Activity = () => {
    const dispatch = useDispatch()
    const { deviceId } = useSelector(deviceSelector)
    const { timestamps } = useSelector(deviceActivitySelector)

    useEffect(() => {
        dispatch(fetchActivity(deviceId))
        convertDateTimeToFrequency(timestamps)
    }, [dispatch, deviceId])
    const convertDateTimeToFrequency = (timestamps) => {
        const results = {}
        const formatTimestamps = timestamps.map((ts) => moment(ts).format('DD-MM-YYYY')).sort()
        formatTimestamps.forEach(ts => {
            if (ts in results) {
                results[ts] += 1
            } else {
                results[ts] = 1
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