import Link from 'next/link'

const NavBar = () => {
	return (
		<header className='flex items-center justify-between px-4 py-3 bg-gray-900'>
			<div>
				<img
					className='h-8'
					src='https://lh3.googleusercontent.com/F8cUV5oOLjCTMSvSRymK1154MwKalnvkepN4xGrfWBC_tcXvNTq_sEStiwCYV61lRdI'
					alt='ZaloPay'
				/>
			</div>
			<Link href='/add-group'>
				<a className='text-white'>Add Group</a>
			</Link>
		</header>
	)
}

export default NavBar
