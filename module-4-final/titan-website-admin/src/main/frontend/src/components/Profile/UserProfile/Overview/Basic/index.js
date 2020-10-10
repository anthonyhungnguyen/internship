import React, { useEffect } from 'react'
import { Card, Descriptions } from 'antd'
export default () => {
	return (
		<Card title="Basic Info" headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }} hoverable={true}>
			<Descriptions column={1} bordered>
				<Descriptions.Item label="Birthday">07/01/2000</Descriptions.Item>
				<Descriptions.Item label="Display Name">Vương Diệu Huyền</Descriptions.Item>
				<Descriptions.Item label="Identity Number">201857167</Descriptions.Item>
				<Descriptions.Item label="Locked">False</Descriptions.Item>
				<Descriptions.Item label="Phone Number">84337152389</Descriptions.Item>
				<Descriptions.Item label="Pin">
					d827d738850054ab10cb6c7f44586f314b282fc8c3f2b3f2bc645a8f4339d7e5
				</Descriptions.Item>
				<Descriptions.Item label="User Gender">2</Descriptions.Item>
				<Descriptions.Item label="KYC Fullname">VUONG DIEU HUYEN</Descriptions.Item>
				<Descriptions.Item label="KYC DOB">07/01/2003</Descriptions.Item>
				<Descriptions.Item label="KYC Gender">2</Descriptions.Item>
				<Descriptions.Item label="KYC Name Verified">True</Descriptions.Item>
				<Descriptions.Item label="KYC DOB Verified">True</Descriptions.Item>
				<Descriptions.Item label="KYC ID Verified">True</Descriptions.Item>
			</Descriptions>
		</Card>
	)
}
