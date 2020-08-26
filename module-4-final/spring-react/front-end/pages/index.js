import Head from 'next/head'
import NavBar from './components/navbar'
import RenderTable from './components/table'

export default function Home() {
	return (
		<div>
			<Head>
				<title>BI Tools</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<NavBar />
			<RenderTable />
		</div>
	)
}
