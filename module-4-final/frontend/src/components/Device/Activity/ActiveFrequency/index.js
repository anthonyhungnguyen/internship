import React from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Label, Bar } from 'recharts'

export default function ({ data }) {

    return (<BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" domain={['01-07-2020', '01-09-2020']}>
            <Label value="Active Date" offset={0} position="insideBottom" />
        </XAxis>
        <YAxis>
            <Label value="Frequency" offset={0} position="insideLeft" angle="-90" />
        </YAxis>
        <Tooltip />
        <Bar dataKey="count" fill="#3498db" label />
    </BarChart>)
}