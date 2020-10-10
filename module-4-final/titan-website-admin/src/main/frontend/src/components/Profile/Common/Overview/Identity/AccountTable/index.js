import React from 'react'
import { Table } from 'antd'

const columns = [
	{
		title: 'Account ID',
		dataIndex: 'cardId',
		key: 'cardId'
	},
	{
		title: 'Bank',
		dataIndex: 'bankName',
		key: 'bankName'
	},
	{
		title: 'First Account No',
		dataIndex: 'firstAccountNo',
		key: 'firstAccountNo'
	},
	{
		title: 'Last Account No',
		dataIndex: 'lastAccountNo',
		key: 'lastAccountNo'
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
			onRow={(record) => {
				return {
					onClick: () => {
						window.open(`http://localhost:3000/#/profile?id=${record.cardid}&type=card_account`, '_blank')
					}
				}
			}}
		/>
	)
}
