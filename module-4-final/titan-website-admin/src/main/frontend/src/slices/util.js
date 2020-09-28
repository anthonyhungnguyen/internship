export const preprocessMoreConnection = (id, connections, nodes, links, newDepth, idList) => {
	const nodeCount = nodes.map((x) => x.id);
	if (newDepth) {
		idList.forEach((eachId) => {
			const splitId = eachId.split('/')[1];
			const expandedNodeIndex = nodes.findIndex((n) => n.id === splitId);
			nodes[expandedNodeIndex] = {
				...nodes[expandedNodeIndex],
				label: {
					fontWeight: 'bold'
				},
				expanded: true
			};
		});
	} else {
		const expandedNodeIndex = nodes.findIndex((n) => n.id === id);
		nodes[expandedNodeIndex] = {
			...nodes[expandedNodeIndex],
			label: {
				fontWeight: 'bold'
			},
			expanded: true
		};
	}

	connections.forEach((c) => {
		const fromType = c['source'].split('/')[0];
		const toType = c['target'].split('/')[0];
		const from = c['source'].split('/')[1].trim();
		const to = c['target'].split('/')[1].trim();
		if (nodeCount.indexOf(from) < 0) {
			nodes.push({
				id: from,
				name: from,
				category: generateCategoryFromType(fromType),
				type: generateInTypeFromOutType(fromType),
				expanded: false
			});
			nodeCount.push(from);
		}
		if (nodeCount.indexOf(to) < 0) {
			nodes.push({
				id: to,
				name: to,
				category: generateCategoryFromType(toType),
				type: generateInTypeFromOutType(toType),
				expanded: false
			});
			nodeCount.push(to);
		}
		if (!links.find((x) => x.source === from && x.target === to)) {
			links.push({
				source: to,
				target: from
			});
		}
	});
	let newNodes = configureSymbolSizeBasedOnDegree(nodes, links);
	return {
		nodes: newNodes,
		links: links
	};
};

export const generateGraphData = (data) => {
	const connectionsData = {
		type: 'force',
		categories: [
			{
				name: 'Root Device'
			},
			{
				name: 'Users'
			},
			{
				name: 'Related Devices'
			},
			{
				name: 'Related Card'
			}
		],
		nodes: data.nodes,
		links: data.links
	};
	const options = {
		legend: {
			data: [ 'Root Device', 'Users', 'Related Devices', 'Related Card' ]
		},

		series: [
			{
				type: 'graph',
				layout: 'force',
				animation: true,
				// edgeSymbol: [ 'none', 'arrow' ],
				label: {
					normal: {
						show: data.nodes.length < 100 ? true : false,
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
				data: connectionsData.nodes,
				categories: connectionsData.categories,
				focusNodeAdjacency: true,
				force: {
					edgeLength: 80,
					repulsion: 600,
					friction: 0.1
				},
				draggable: true,
				edges: connectionsData.links,
				roam: true,
				symbolSize: 14
			}
		]
	};
	return options;
};

export const generateInTypeFromOutType = (type) => {
	switch (type) {
		case 'devices':
			return 'device';
		case 'users':
			return 'user';
		case 'card_account':
			return 'card_account';
	}
};

export const generateCategoryFromType = (type) => {
	switch (type) {
		case 'devices':
			return 2;
		case 'users':
			return 1;
		case 'card_account':
			return 3;
	}
};

export const configureSymbolSizeBasedOnDegree = (nodes, links) => {
	const newNodes = [];
	nodes.forEach((n) => {
		let outDegreeCount = 0;
		let inDegreeCount = 0;
		links.forEach((l) => {
			if (l.source === n.id) {
				outDegreeCount += 1;
			} else if (l.target === n.id) {
				inDegreeCount += 1;
			}
		});
		const totalDegree = inDegreeCount + outDegreeCount;
		const symbolSize = adjustSymbolSize(totalDegree);
		newNodes.push({ ...n, symbolSize: symbolSize, value: symbolSize });
	});
	return newNodes;
};

const adjustSymbolSize = (totalDegree) => {
	if (totalDegree < 10) {
		return 8;
	}
	return totalDegree;
};
