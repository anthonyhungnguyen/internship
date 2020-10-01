import React, { useEffect, useState } from 'react'
import { Card, Descriptions, Skeleton } from 'antd'
import moment from 'moment'
import copy from 'copy-to-clipboard'
import { Select } from 'antd'

const { Option } = Select

export default ({ id }) => {
	const [ users, setUsers ] = useState(null)
	const [ card, setCard ] = useState(null)

	useEffect(
		() => {
			const fetchUserList = async () => {
				const userListResponse = await fetch('http://localhost:8085/api/user_device/test', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						query: `FOR v, e IN 1..1 ANY @id user_card_account
									COLLECT users = e._from
									RETURN users`,
						bindVars: {
							id: `card_account/${id}`
						}
					})
				})
				const userList = await userListResponse.json()
				setUsers(userList)
			}

			const fetchCardBasicInfo = async () => {
				const cardResponse = await fetch('http://localhost:8085/api/user_device/test', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						query: `RETURN FIRST(FOR v, e IN 1..1 ANY @id user_card_account
								SORT e.reqDate DESC
								RETURN KEEP(e, ['bankname', 'bankCode', 'reqDate']))`,
						bindVars: {
							id: `card_account/${id}`
						}
					})
				})
				const data = await cardResponse.json()
				setCard(data[0])
			}

			fetchUserList()
			fetchCardBasicInfo()
		},
		[ id ]
	)
	console.log(users)
	return users && card ? (
		<Card title="Card Brief Info" headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }} hoverable={true}>
			<Descriptions column={1} bordered>
				<Descriptions.Item label="Card ID">{id}</Descriptions.Item>
				<Descriptions.Item label="Bank Name">{card.bankname}</Descriptions.Item>
				<Descriptions.Item label="Bank Code">{card.bankCode}</Descriptions.Item>
				<Descriptions.Item label="Last Request Date">{moment(card.reqDate).format('L LTS')}</Descriptions.Item>
				<Descriptions.Item label={`Total Users (${users.length})`}>
					<Select
						defaultValue={users[0].split('/')[1].trim()}
						style={{ width: 180 }}
						onSelect={(e) => copy(e)}
					>
						{users.map((u) => {
							const userId = u.split('/')[1].trim()
							return (
								<Option value={userId} key={userId}>
									{userId}
								</Option>
							)
						})}
					</Select>
				</Descriptions.Item>
			</Descriptions>
		</Card>
	) : (
		<Skeleton active />
	)
}
