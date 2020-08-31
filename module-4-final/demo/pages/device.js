import Head from 'next/head'
import NavBar from './components/NavBar/NavBar'
import Device from './components/Device/Device'

export default function DevicePage() {
	return (
		<div>
			<Head>
				<title>Device</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="flex relative">
				<NavBar />
				<Device />
			</div>
		</div>
	)
}
