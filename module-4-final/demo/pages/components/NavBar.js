import { VscDashboard, VscDeviceMobile } from 'react-icons/vsc'
import { AiOutlineUser } from 'react-icons/ai'
const NavBar = () => {
	return (
		<nav className='h-full fixed text-white'>
			<div className='flex items-center border-b p-4'>
				<img
					src='https://lh3.googleusercontent.com/F8cUV5oOLjCTMSvSRymK1154MwKalnvkepN4xGrfWBC_tcXvNTq_sEStiwCYV61lRdI'
					alt='ZaloPay logo'
					className='w-1/6'
				/>
				<h2 className='ml-4 font-bold text-xl'>ZALOPAY</h2>
			</div>
			<div>
				<ul>
					<li className='p-4'>
						<VscDashboard className='w-1/6 text-2xl inline' /> <span className='ml-2'>Dashboard</span>
					</li>
					<li className='p-4'>
						<VscDeviceMobile className='w-1/6 text-2xl inline' /> <span className='ml-2'>Device</span>
					</li>
					<li className='p-4'>
						<AiOutlineUser className='w-1/6 text-2xl inline' /> <span className='ml-2'>User</span>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default NavBar
