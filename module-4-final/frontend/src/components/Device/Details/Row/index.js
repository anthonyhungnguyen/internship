import React from 'react'
export default ({ label, data, labelCSS, dataCSS }) => (
	<div className="flex text-gray-700 my-3">
		<span className={'w-1/3 font-bold ' + labelCSS}>{label}</span>
		<span className={'w-2/3 ' + dataCSS}>{data}</span>
	</div>
)
