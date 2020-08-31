import { Line } from 'rc-progress'
const Score = () => {
	return (
		<div className='flex bg-white p-10 rounded items-center justify-center'>
			<div className='w-1/3 border-r-2'>
				<p className='text-6xl'>32.22</p>
				<p className='text-xs text-gray-500 font-bold'>FRAUD SCORE</p>
				<Line percent='33.32' strokeWidth='1' className='w-2/3 mt-2' strokeColor='#e74c3c' />
			</div>
			<div className='w-2/3'>
				<p className='my-2 mx-6 font-bold'>Details score</p>
				<div className='grid grid-rows-2 grid-flow-col gap-4 my-2 px-6'>
					<div>
						<p className='text-4xl'>17.8</p>
						<p className='text-xs text-gray-500 font-bold'>OS SCORE</p>
						<Line percent='17.8' strokeWidth='1' className='w-2/3 mt-2' strokeColor='#e74c3c' />
					</div>
					<div>
						<p className='text-4xl'>13.42</p>
						<p className='text-xs  text-gray-500 font-bold'>PROXY SCORE</p>
						<Line percent='13.42' strokeWidth='1' className='w-2/3 mt-2' strokeColor='#e74c3c' />
					</div>
					<div>
						<p className='text-4xl'>52.8</p>
						<p className='text-xs  text-gray-500 font-bold'>USER SCORE</p>
						<Line percent='52.8' strokeWidth='1' className='w-2/3 mt-2' strokeColor='#f1c40f' />
					</div>
					<div>
						<p className='text-4xl'>98.8</p>
						<p className='text-xs  text-gray-500 font-bold'>VELOCITY SCORE</p>
						<Line percent='98.8' strokeWidth='1' className='w-2/3 mt-2' strokeColor='#2ecc71' />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Score
