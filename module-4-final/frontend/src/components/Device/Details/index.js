import React from 'react'
import Score from './Score'
import System from './System'
import Identity from './Identity'
import IPInformation from './IPInformation'
const Details = () => {
	return (
		<div className="p-4 bg-gray-400">
			<Score />

			<div className="flex mt-4 flex-wrap flex-row gap-4">
				<System />
				<div className="flex gap-4 flex-col flex-1">
					<Identity />
					<IPInformation />
				</div>
			</div>
		</div>
	)
}

export default Details
