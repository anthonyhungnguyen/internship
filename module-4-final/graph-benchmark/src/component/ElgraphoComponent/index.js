import React from 'react'
import ElGrapho from 'elgrapho'

export default () => {
	let model = {
		nodes: [ { group: 0 }, { group: 1 }, { group: 1 }, { group: 2 }, { group: 2 }, { group: 3 } ],
		edges: [ { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 1, to: 3 }, { from: 1, to: 4 }, { from: 2, to: 5 } ],
		steps: 30
	}
	let graph = new ElGrapho({
		container: document.getElementById('container'),
		model: ElGrapho.layouts.ForceDirected(model)
	})
	return (
		<div
			id="container"
			style={{
				width: '600px',
				height: '600px'
			}}
		/>
	)
}
