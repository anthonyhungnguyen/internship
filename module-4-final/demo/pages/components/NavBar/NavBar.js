import { VscDashboard, VscDeviceMobile } from 'react-icons/vsc'
import { AiOutlineUser } from 'react-icons/ai'
import CustomLink from './Link'
const NavBar = () => {
	return (
		<nav className="h-full fixed text-white">
			<div className="flex items-center border-b p-4">
				<img
					src="https://lh3.googleusercontent.com/F8cUV5oOLjCTMSvSRymK1154MwKalnvkepN4xGrfWBC_tcXvNTq_sEStiwCYV61lRdI"
					alt="ZaloPay logo"
					className="w-1/6"
				/>
				<h2 className="ml-4 font-bold text-xl">ZALOPAY</h2>
			</div>
			<div>
				<ul>
					<CustomLink href="/">
						<li className="p-4 cursor-pointer hover:bg-white hover:text-black">
							<VscDashboard className="w-1/6 text-2xl inline" /> <span className="ml-2">Dashboard</span>
						</li>
					</CustomLink>
					<CustomLink href="/device">
						<li className="p-4 cursor-pointer hover:bg-white hover:text-black">
							<VscDeviceMobile className="w-1/6 text-2xl inline" /> <span className="ml-2">Device</span>
						</li>
					</CustomLink>
					<CustomLink href="/user">
						<li className="p-4 cursor-pointer hover:bg-white hover:text-black">
							<AiOutlineUser className="w-1/6 text-2xl inline" /> <span className="ml-2">User</span>
						</li>
					</CustomLink>
				</ul>
			</div>
		</nav>
	)
}

export default NavBar
