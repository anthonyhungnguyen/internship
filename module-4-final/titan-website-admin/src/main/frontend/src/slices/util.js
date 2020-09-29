import { Base64 } from 'js-base64'
Base64.extendString()
export const preprocessMoreConnection = (connections, nodes, links) => {
	const nodeCount = nodes.map((x) => x.id)
	connections.forEach((c) => {
		const fromType = c['source'].split('/')[0]
		const toType = c['target'].split('/')[0]
		const from = c['source'].split('/')[1].trim()
		const to = c['target'].split('/')[1].trim()
		if (nodeCount.indexOf(from) < 0) {
			nodes.push({
				id: from,
				name: from,
				category: generateCategoryFromType(fromType),
				type: generateInTypeFromOutType(fromType),
				expanded: false
			})
			nodeCount.push(from)
		}
		if (nodeCount.indexOf(to) < 0) {
			nodes.push({
				id: to,
				name: to,
				category: generateCategoryFromType(toType),
				type: generateInTypeFromOutType(toType),
				expanded: false
			})
			nodeCount.push(to)
		}
		if (!links.find((x) => (x.source === from && x.target === to) || (x.source === to && x.target === from))) {
			links.push({
				source: to,
				target: from
			})
		}
	})
	let newNodes = configureSymbolSizeBasedOnDegree(nodes, links)
	return {
		nodes: newNodes,
		links: links
	}
}

export const generateGraphData = (data, type) => {
	const categoriesAndLegends = generateCategoriesAndLegendsFromRoot(type)
	const options = {
		legend: { data: categoriesAndLegends, itemHeight: 22 },
		series: [
			{
				type: 'graph',
				layout: 'force',
				animation: true,
				// edgeSymbol: [ 'none', 'arrow' ],
				label: {
					normal: {
						show: data.nodes.length < 50 ? true : false,
						position: 'top',
						formatter: '{b}',
						fontSize: 11
					}
				},
				itemStyle: {
					borderColor: '#fff',
					borderWidth: 1,
					shadowBlur: 5,
					shadowColor: 'rgba(0, 0, 0, 0.1)'
				},
				lineStyle: {
					color: 'source',
					curveness: 0.1,
					width: 0.5
				},
				emphasis: {
					lineStyle: {
						width: 5
					}
				},
				data: data.nodes,
				categories: categoriesAndLegends,
				focusNodeAdjacency: true,
				force: {
					edgeLength: 70,
					repulsion: 1000,
					friction: 0.2
				},
				draggable: true,
				edges: data.links,
				roam: true,
				symbolSize: 14
			}
		]
	}
	return options
}

export const generateCategoriesAndLegendsFromRoot = (type) => {
	const users = generateSymbolFromType('users')
	const devices = generateSymbolFromType('devices')
	const cards = generateSymbolFromType('card_account')
	const rootUser = generateSymbolFromType('rootUser')
	const rootDevice = generateSymbolFromType('rootDevice')
	let defaultType = [
		{
			name: 'Related Users',
			symbol: users,
			icon: users
		},
		{
			name: 'Related Devices',
			symbol: devices,
			icon: devices
		},
		{
			name: 'Related Card',
			symbol: cards,
			icon: cards
		}
	]
	if (type === 'user') {
		defaultType = [
			{
				name: 'Root User',
				symbol: rootUser,
				icon: rootUser
			},
			...defaultType
		]
	} else if (type === 'device') {
		defaultType = [
			{
				name: 'Root Device',
				symbol: rootDevice,
				icon: rootDevice
			},
			...defaultType
		]
	}
	return defaultType
}

export const generateInTypeFromOutType = (type) => {
	switch (type) {
		case 'devices':
			return 'device'
		case 'users':
			return 'user'
		case 'card_account':
			return 'card_account'
	}
}

export const generateCategoryFromType = (type) => {
	switch (type) {
		case 'devices':
			return 2
		case 'users':
			return 1
		case 'card_account':
			return 3
	}
}

export const generateSymbolFromType = (type) => {
	switch (type) {
		case 'rootDevice':
			return `image://${process.env.PUBLIC_URL + '/assets/icon/rootDevice.png'}`
		case 'rootUser':
			return `image://${process.env.PUBLIC_URL + '/assets/icon/rootUser.png'}`
		case 'devices':
			return `image://${process.env.PUBLIC_URL + '/assets/icon/smartphone.png'}`
		case 'users':
			return `image://${process.env.PUBLIC_URL + '/assets/icon/man.png'}`
		case 'card_account':
			return `image://${process.env.PUBLIC_URL + '/assets/icon/credit-card.png'}`
	}
}

export const configureSymbolSizeBasedOnDegree = (nodes, links) => {
	const newNodes = []
	nodes.forEach((n) => {
		let outDegreeCount = 0
		let inDegreeCount = 0
		links.forEach((l) => {
			if (l.source === n.id) {
				outDegreeCount += 1
			} else if (l.target === n.id) {
				inDegreeCount += 1
			}
		})
		const totalDegree = inDegreeCount + outDegreeCount
		const symbolSize = adjustSymbolSize(totalDegree)
		newNodes.push({ ...n, symbolSize: symbolSize, value: symbolSize })
	})
	return newNodes
}

const adjustSymbolSize = (totalDegree) => {
	if (totalDegree < 10) {
		return 8
	}
	return totalDegree
}
