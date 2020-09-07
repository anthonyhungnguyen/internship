import Head from 'next/head'
import NavBar from './components/NavBar/NavBar'
import Device from './components/Device/Device'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { postsSelector, fetchPosts } from '../slices/posts'

const DevicePage = () => {
	const dispatch = useDispatch()
	const { posts, loading, hasErrors } = useSelector(postsSelector)
	useEffect(
		() => {
			dispatch(fetchPosts())
		},
		[dispatch]
	)
	console.log(posts, loading, hasErrors)
	return (
		<div>
			<Head>
				<title>Device</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='flex relative'>
				<NavBar />
				<Device />
			</div>
		</div>
	)
}

export default DevicePage
