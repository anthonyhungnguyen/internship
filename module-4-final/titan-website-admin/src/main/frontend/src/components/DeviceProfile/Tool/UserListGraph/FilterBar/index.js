import React from 'react'
import { Card, Input } from 'antd'

const { Search } = Input

export default ({ setUserList }) => {
	const handlePreprocessUserListSearch = (listRaw) => {
		const preprocessedList = listRaw.split(',').map((x) => x.trim())
		setUserList(preprocessedList)
	}

	return (
		<Card title="Filter Bar" headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }} hoverable={true}>
			<p className="font-bold ">Enter User List (seperated by comma)</p>
			<Search
				placeholder="input search text"
				onSearch={(value) => handlePreprocessUserListSearch(value)}
				enterButton
				className="w-full"
			/>
		</Card>
	)
}
