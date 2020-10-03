import React, { useEffect, useState } from 'react'
import { Card, Descriptions, Skeleton } from 'antd'
import moment from 'moment'
import axios from 'axios'
import copy from 'copy-to-clipboard'
import { Select } from 'antd'

const { Option } = Select

export default ({ id }) => {
	const [ users, setUsers ] = useState(null)
	const [ card, setCard ] = useState(null)

	useEffect(
		() => {
			const fetchUserList = async () => {
				await axios
					.post(`http://localhost:8085/api/profile/card/userList`, {
						type: 'card_account',
						id: id
					})
					.then((response) => {
						setUsers(response.data)
					})
					.catch((err) => {
						console.log(err)
					})
			}

			const fetchCardBasicInfo = async () => {
				await axios
					.post(`http://localhost:8085/api/profile/mapping/basicInfo`, {
						type: 'card_account',
						id: id
					})
					.then((response) => {
						setCard(response.data[0])
					})
					.catch(console.err)
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
