import React, { useState, useEffect } from 'react'
import { Card, Descriptions } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { Select, Skeleton } from 'antd'
import moment from 'moment'
import copy from 'copy-to-clipboard'
import { generalSelector } from '../../../../../slices/general'
import { storeLastDate, userSelector } from '../../../../../slices/user'

const { Option } = Select

export default () => {
	const { id } = useSelector(generalSelector)
	const { date } = useSelector(userSelector)
	const [ devices, setDevices ] = useState(null)
	const [ cards, setCards ] = useState(null)
	const dispatch = useDispatch()

	useEffect(
		() => {
			const fetchLastOnboardAndTransactionDate = async (id) => {
				const lastReqDateResponse = await fetch('http://localhost:8085/api/profile/test', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						query: `LET last_device_onboard = FIRST((FOR v, e IN 1..1 ANY @id user_device_onboard
								SORT e.timestamp DESC
								LET date = DATE_ISO8601(TO_NUMBER(e.timestamp * 1000))
								RETURN date))
							
							LET last_device_transaction = FIRST((FOR v, e IN 1..1 ANY @id user_device_transaction
								SORT DATE_ISO8601(e.reqDate) DESC
								LET date = DATE_ISO8601(e.reqDate)
								RETURN date))
								
							RETURN {last_device_onboard, last_device_transaction}`,
						bindVars: {
							id: `users/${id}`
						}
					})
				})
				const lastReqDateData = await lastReqDateResponse.json()
				const { last_device_onboard, last_device_transaction } = lastReqDateData[0]

				dispatch(storeLastDate({ last_device_onboard, last_device_transaction }))
			}

			const fetchDevicesAndCards = async (id) => {
				const response = await fetch('http://localhost:8085/api/profile/test', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						query: `
					LET devices_related = (FOR v, e IN 1..1 ANY @id user_device_onboard
						COLLECT devices = e._to
						RETURN devices)
					
					LET cards_related = (FOR v, e IN 1..1 ANY @id user_card_account
						COLLECT cards = e._to
						RETURN cards)
						
					RETURN {devices: devices_related, cards: cards_related}
					`,
						bindVars: {
							id: `users/${id}`
						}
					})
				})
				const data = await response.json()
				const { devices, cards } = data[0]
				setDevices(devices)
				setCards(cards)
			}

			fetchLastOnboardAndTransactionDate(id)
			fetchDevicesAndCards(id)
		},
		[ id, dispatch ]
	)

	return date && devices && cards ? (
		<Card title="Identity" headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }} hoverable={true}>
			<Descriptions column={1} bordered>
				<Descriptions.Item label="User ID">{id}</Descriptions.Item>
				<Descriptions.Item label="Last Device Onboard">
					{date.lastOnboard ? moment(date.lastOnboard).format('L LTS') : 'Unknown'}
				</Descriptions.Item>
				<Descriptions.Item label="Last Device Transaction">
					{date.lastTransaction ? moment(date.lastTransaction).format('L LTS') : 'Unknown'}
				</Descriptions.Item>
				{devices.length > 0 ? (
					<Descriptions.Item label={`Total Devices (${devices.length})`}>
						<Select
							defaultValue={devices[0].split('/')[1].trim()}
							style={{ width: 180 }}
							onSelect={(e) => copy(e)}
						>
							{devices.map((u) => {
								const deviceId = u.split('/')[1].trim()
								return (
									<Option value={deviceId} key={deviceId}>
										{deviceId}
									</Option>
								)
							})}
						</Select>
					</Descriptions.Item>
				) : (
					<Descriptions.Item label={`Total Devices (0)`} />
				)}
				{cards.length > 0 ? (
					<Descriptions.Item label={`Total Cards (${cards.length})`}>
						<Select
							defaultValue={cards[0].split('/')[1].trim()}
							style={{ width: 180 }}
							onSelect={(e) => copy(e)}
						>
							{cards.map((u) => {
								const cardId = u.split('/')[1].trim()
								return (
									<Option value={cardId} key={cardId}>
										{cardId}
									</Option>
								)
							})}
						</Select>
					</Descriptions.Item>
				) : (
					<Descriptions.Item label={`Total Cards (0)`} />
				)}
			</Descriptions>
		</Card>
	) : (
		<Skeleton active />
	)
}
