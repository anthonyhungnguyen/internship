import React, { useEffect, useState } from 'react'
import { Input, Radio, Menu, Dropdown, Button, Select } from 'antd'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addFilter, dataSelector, removeFilter, storeEdgeType, storeId, storeIdType } from '../../slices/graph'
import { DownOutlined, UserOutlined } from '@ant-design/icons'

export default () => {
	const dispatch = useDispatch()
	const { id, options } = useSelector(dataSelector)
	const { idType, edgeType } = options
	const [ currentId, setCurrentId ] = useState(id)
	const [ types, setTypes ] = useState([])
	const [ attributes, setAttributes ] = useState({})
	const [ filters, setFilters ] = useState([])

	useEffect(
		() => {
			const handleRenderTypes = async () => {
				const response = await fetch('http://localhost:8085/api/user_device/test/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						query: `FOR v, e IN 1..1 %s @id @@col %s %s RETURN %s`,
						bindVars: {
							'@col': 'users_devices',
							id: `${idType}/${id}`
						},
						options: {
							direction: 'ANY',
							filter: '',
							collect: 'COLLECT type = e.type',
							return: 'type'
						}
					})
				})
				const data = await response.json()
				setTypes(data)
			}
			handleRenderTypes()
		},
		[ currentId ]
	)

	useEffect(
		() => {
			handleRenderAttributes()
		},
		[ edgeType ]
	)

	const checkType = async (id) => {
		id = id.trim()
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
		const typeIndex = data.findIndex((x) => !x)
		dispatch(storeIdType(handleConvertTypeIndexToType(typeIndex)))
		dispatch(storeId(id))
	}

	const handleRenderAttributes = async () => {
		const response = await fetch('http://localhost:8085/api/user_device/test/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query: 'FOR v, e IN @fromDepth..@toDepth %s @id @@col %s %s LIMIT @limit RETURN %s',
				bindVars: {
					'@col': 'users_devices',
					fromDepth: 1,
					toDepth: 1,
					id: `${idType}/${id}`,
					limit: null
				},
				options: {
					direction: 'ANY',
					filter: edgeType !== 'all' ? `FILTER e.type == '${edgeType}'` : '',
					collect: 'COLLECT attr = ATTRIBUTES(e, true), type = e.type',
					return: '{"type": type, "attr": attr}'
				}
			})
		})
		const data = await response.json()
		const formatData = {}
		data.map((d) => (formatData[d.type] = d.attr))
		setAttributes(formatData)
	}

	const handleConvertTypeIndexToType = (typeIndex) => {
		switch (typeIndex) {
			case 0:
				return 'devices'
			case 1:
				return 'users'
			default:
				return 'undefined'
		}
	}

	const handleConvertEdgeTypeCode = (type) => {
		switch (type) {
			case 'transaction':
				return 'Transaction'
			case 'user_use_device':
				return 'User Uses Device'
		}
	}

	const handleConvertTransactionAttributes = (attributes) => {
		return (
			<React.Fragment>
				{Object.keys(attributes).map((groupName, gi) => (
					<Select
						mode="multiple"
						style={{ width: '100%' }}
						placeholder={groupName}
						defaultValue={[]}
						onChange={(e) => setFilters((old) => [ ...old, { field: e[e.length - 1], query: '' } ])}
						onDeselect={(e) => setFilters((old) => old.filter((x) => x.field !== e))}
						options={attributes[groupName].map((opt) => ({ value: opt }))}
					/>
				))}
			</React.Fragment>
		)
	}

	const handleRenderFilter = () => {
		return filters.map((a, ai) => (
			<div>
				<label>{a.field}</label>
				<input id={a} value={a.query} />
			</div>
		))
	}

	const handleFocus = (e) => {
		checkType(e)
	}

	console.log(filters)

	return (
		<React.Fragment>
			<Input.Search value={currentId} onSearch={handleFocus} onChange={(e) => setCurrentId(e.target.value)} />
			<p>ID Type:</p>
			<Radio.Group value={idType}>
				<Radio value="devices">Device</Radio>
				<Radio value="users">User</Radio>
				<Radio value="undefined">Undefined</Radio>
			</Radio.Group>
			<p>Edge Type</p>
			{types.length > 0 && (
				<Radio.Group value={edgeType} onChange={(e) => dispatch(storeEdgeType(e.target.value))}>
					{types.map((t, i) => (
						<Radio value={t} key={i}>
							{handleConvertEdgeTypeCode(t)}
						</Radio>
					))}
					<Radio value="all">All</Radio>
				</Radio.Group>
			)}
			<p>Filter List</p>
			{attributes && handleConvertTransactionAttributes(attributes)}
			{handleRenderFilter()}
		</React.Fragment>
	)
}
