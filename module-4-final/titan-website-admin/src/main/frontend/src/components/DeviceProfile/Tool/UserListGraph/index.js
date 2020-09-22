import React, { useState } from 'react'
import FilterBar from './FilterBar'
import Graph from './Graph'

export default () => {
	const [ userList, setUserList ] = useState(null)

	return (
		<React.Fragment>
			<FilterBar userList={userList} setUserList={setUserList} />
			{userList && <Graph userList={userList} />}
		</React.Fragment>
	)
}
