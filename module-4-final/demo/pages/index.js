import Head from 'next/head'
import NavBar from './components/NavBar'
import Device from './components/Device/Device'

export default function Home() {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='flex relative'>
				<NavBar />
				<Device />
			</div>
		</div>
	)
}
