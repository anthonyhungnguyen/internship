import React, { useEffect, useState } from 'react'
import { Card, Descriptions, Skeleton, Image } from 'antd'
import axios from 'axios'
import { generalSelector } from '../../../../../slices/general'
import { useSelector } from 'react-redux'
import DescriptionsItem from 'antd/lib/descriptions/Item'
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'
export default () => {
	const { id } = useSelector(generalSelector)
	const [ info, setInfo ] = useState(null)
	console.log(info)
	useEffect(
		() => {
			axios
				.post('http://localhost:8085/api/profile/user/info', {
					id: `userid/${id}`
				})
				.then((response) => {
					const data = response.data
					setInfo({
						Avatar: <Image src={data['avatar']} />,
						'Display Name': data['displayname'],
						Birthday: data['birthdate'],
						Gender: data['usergender'],
						'Is Locked': data['islocked'] ? (
							<CheckCircleTwoTone twoToneColor="#52c41a" />
						) : (
							<CloseCircleTwoTone twoToneColor="#e74c3c" />
						),
						'Profile Level': data['profilelevel'],
						'Acquital Result': data['acquital_result'] ? (
							<CheckCircleTwoTone twoToneColor="#52c41a" />
						) : (
							<CloseCircleTwoTone twoToneColor="#e74c3c" />
						),
						'Postmoterm Add Date': data['postmortem_add_date'],
						'Postmoterm Result': data['postmortem_result'],
						'KYC DOB': data['kycdob'],
						'KYC Fullname': data['kycfullname'],
						'KYC Gender': data['kycgender'],
						'Phone Number': data['phonenumber'],
						'Zalo ID': data['zaloid']
					})
				})
				.catch(console.err)
		},
		[ id ]
	)

	return info ? (
		<Card title="Basic Info" headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }} hoverable={true}>
			<Descriptions column={1} bordered>
				{Object.keys(info).map((k, i) => (
					<DescriptionsItem label={k} key={i}>
						{info[k]}
					</DescriptionsItem>
				))}
			</Descriptions>
		</Card>
	) : (
		<Skeleton active />
	)
}
