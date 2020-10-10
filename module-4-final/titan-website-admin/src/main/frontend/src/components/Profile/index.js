import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './index.css'
import DeviceProfile from './DeviceProfile'
import UserProfile from './UserProfile'
import { generalSelector, storeExist, storeId, storeType } from '../../slices/general'
import axios from 'axios'
import { message } from 'antd'
import { useDispatch } from 'react-redux'

message.config({
	top: 50
})

export default React.memo(() => {
	const { id, type, exist } = useSelector(generalSelector)

	const dispatch = useDispatch()

	const checkParams = () => {
		let href = window.location.href
		let containsParams = href.split('?')
		if (containsParams.length === 2) {
			let parseParams = containsParams[1].split('&')
			let result = {}
			parseParams.forEach((par) => {
				let keyValue = par.split('=')
				result[keyValue[0]] = keyValue[1]
			})
			dispatch(storeId(result['id']))
			dispatch(storeType(result['type']))
		}
	}
	checkParams()

	useEffect(
		() => {
			const checkIdAndTypeExists = async () => {
				await axios
					.post('http://localhost:8085/api/profile/exists', {
						type: type,
						id: id
					})
					.then((response) => {
						dispatch(storeExist(response.data))
					})
					.catch(console.error)
			}
			checkIdAndTypeExists()
		},
		[ id, type ]
	)

	if (!exist) {
		message.error(`${type} with ID: ${id} not found`)
	}

	return (
		<React.Fragment>
			{type === 'devices' && <DeviceProfile />}
			{type === 'users' && <UserProfile />}
		</React.Fragment>
	)
})
