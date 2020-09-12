import React from 'react'
import ActivityFrequency from './ActivityFrequency'
import { BackTop } from 'antd'
import { UpCircleFilled } from '@ant-design/icons'

export default () => {
	return (
		<div className="animated fadeIn">
			<ActivityFrequency />
			<BackTop>
				<UpCircleFilled style={{ fontSize: '30px', color: '#3498db' }} />
			</BackTop>
		</div>
	)
}
