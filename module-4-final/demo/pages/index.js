import Head from 'next/head'
import NavBar from './components/NavBar/NavBar'
import Dashboard from './components/Dashboard/Dashboard'

export default function Home() {
	return (
		<div>
			<Head>
				<title>Home</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="flex relative">
				<NavBar />
				<Dashboard />
			</div>
		</div>
	)
}
