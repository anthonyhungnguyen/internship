import Head from 'next/head'
import BankSuccess from './components/bankSuccess'
import User from './components/user'

export default function Home() {
	return (
		<div className='container h-screen w-screen'>
			<Head>
				<title>BI Tools</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='flex justify-center flex-col w-screen'>
				<BankSuccess />
				<User />
			</main>
		</div>
	)
}
