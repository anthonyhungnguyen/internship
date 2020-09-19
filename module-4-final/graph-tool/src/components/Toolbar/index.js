import React, { useState } from 'react'
import { Input, Radio } from 'antd'

export default ({ setType, setId }) => {
	const [ currentId, setCurrentId ] = useState('')
	const [ idType, setIdType ] = useState(2)
	const checkType = async (id) => {
		const response = await fetch('http://localhost:8085/api/user_device/test/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query: `LET checkList = ['devices/${id}', 'users/${id}']
						FOR c in checkList
							LET NOTNULL = IS_NULL(DOCUMENT(c))
							RETURN NOTNULL`,
				bindVars: null,
				options: {
					direction: null,
					collect: null,
					return: null
				}
			})
		})
		const data = await response.json()
		setCurrentId(id)
		const typeIndex = data.findIndex((x) => !x)
		setIdType(typeIndex)
		setType(() => {
			switch (typeIndex) {
				case 0:
					return 'devices'
				case 1:
					return 'users'
			}
		})
		setId(id)
	}

	const handleFocus = (e) => {
		checkType(e)
	}
	return (
		<React.Fragment>
			<Input.Search value={currentId} onSearch={handleFocus} onChange={(e) => setCurrentId(e.target.value)} />

			<Radio.Group value={idType}>
				<Radio value={0}>Device</Radio>
				<Radio value={1}>User</Radio>
				<Radio value={2}>Undefined</Radio>
			</Radio.Group>
		</React.Fragment>
	)
}
