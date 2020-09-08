import React, { useEffect } from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Label, Bar } from 'recharts'
import { useDispatch, useSelector } from 'react-redux/'
import { formatTimestamp, deviceActivitySelector } from '../../../../slices/device_activity'

export default function() {
	const dispatch = useDispatch()
	const { loading, timestamps, formattedTimestamps } = useSelector(deviceActivitySelector)
	useEffect(
		() => {
			dispatch(formatTimestamp(timestamps))
		},
		[ dispatch, timestamps ]
	)
	return (
		<BarChart width={730} height={250} data={formattedTimestamps}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="date" domain={[ '01-07-2020', '01-09-2020' ]}>
				<Label value="Active Date" offset={0} position="insideBottom" />
			</XAxis>
			<YAxis>
				<Label value="Frequency" offset={0} position="insideLeft" angle={-90} />
			</YAxis>
			<Tooltip />
			<Bar dataKey="count" fill="#3498db" label />
		</BarChart>
	)
}
