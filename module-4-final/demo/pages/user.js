import Head from 'next/head'
import NavBar from './components/NavBar/NavBar'

export default function User() {
	return (
		<div>
			<Head>
				<title>User</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="flex relative">
				<NavBar />
			</div>
		</div>
	)
}
