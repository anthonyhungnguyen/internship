import React from 'react'
import { Table } from 'antd'
import moment from 'moment'

const columns = [
	{
		title: 'User ID',
		dataIndex: 'userid',
		key: 'userid',
		render: (text) => <a>{text}</a>
	},
	{
		title: 'First Seen',
		dataIndex: 'firstseen',
		key: 'firstseen',
		sorter: (a, b) => moment(a.firstseen, 'L LT').isAfter(moment(b.firstseen, 'L LT'))
	},
	{
		title: 'Last Seen',
		dataIndex: 'lastseen',
		key: 'lastseen',
		sorter: (a, b) => moment(a.lastseen, 'L LT').isAfter(moment(b.lastseen, 'L LT'))
	}
]

export default React.memo(({ data }) => {
	return (
		<Table
			columns={columns}
			dataSource={data}
			loading={data ? false : true}
			scroll={{ y: 240 }}
			pagination={false}
			onRow={(record, rowIndex) => {
				return {
					onClick: () => {
						window.open(`http://localhost:3000/#/profile?id=${record.userid}&type=users`, '_blank')
					}
				}
			}}
		/>
	)
})
