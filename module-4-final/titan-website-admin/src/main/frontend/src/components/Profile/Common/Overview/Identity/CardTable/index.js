import React from 'react'
import { Table } from 'antd'
import moment from 'moment'

const columns = [
	{
		title: 'Card ID',
		dataIndex: 'cardid',
		key: 'cardid',
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

export default ({ data }) => {
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
						window.open(`http://localhost:3000/#/profile?id=${record.cardid}&type=card_account`, '_blank')
					}
				}
			}}
		/>
	)
}
