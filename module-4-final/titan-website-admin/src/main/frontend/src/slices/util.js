export const preprocessMoreConnection = (connections, nodes, links) => {
    const nodeCount = nodes.map((x) => x.id)
    connections.forEach((c) => {
        const fromType = c["source"].split("/")[0]
        const toType = c["target"].split("/")[0]
        const from = c["source"].split("/")[1].trim()
        const to = c["target"].split("/")[1].trim()
        if (nodeCount.indexOf(from) < 0) {
            nodes.push({
                id: from,
                name: from,
                category: generateCategoryFromType(fromType),
                type: fromType,
                expanded: false,
            })
            nodeCount.push(from)
        }
        if (nodeCount.indexOf(to) < 0) {
            nodes.push({
                id: to,
                name: to,
                category: generateCategoryFromType(toType),
                type: toType,
                expanded: false,
            })
            nodeCount.push(to)
        }
        if (
            !links.find(
                (x) =>
                    (x.source === from && x.target === to) ||
                    (x.source === to && x.target === from)
            )
        ) {
            links.push({
                source: to,
                target: from,
            })
        }
    })
    let newNodes = configureSymbolSizeBasedOnDegree(nodes, links)
    return {
        nodes: newNodes,
        links: links,
    }
}

export const generateGraphData = (data, type) => {
    const categoriesAndLegends = generateCategoriesAndLegendsFromRoot(type)
    const options = {
        legend: { data: categoriesAndLegends, itemHeight: 22 },
        tooltip: {},
        series: [
            {
                type: "graph",
                layout: "force",
                animation: false,
                edgeSymbol: ["none", "arrow"],
                edgeSymbolSize: 3,
                label: {
                    normal: {
                        show: data.nodes.length < 50 ? true : false,
                        position: "top",
                        fontSize: 11,
                    },
                },
                itemStyle: {
                    borderColor: "#fff",
                    borderWidth: 1,
                    shadowBlur: 5,
                    shadowColor: "rgba(0, 0, 0, 0.1)",
                },
                lineStyle: {
                    color: "source",
                    curveness: 0.1,
                    width: 0.3,
                },
                emphasis: {
                    lineStyle: {
                        width: 3,
                    },
                },
                nodes: data.nodes,
                categories: categoriesAndLegends,
                // focusNodeAdjacency: true,
                force: {
                    edgeLength: 100,
                    repulsion: 200,
                    friction: 0.1,
                    layoutAnimation: true,
                },
                draggable: true,
                links: data.links,
                roam: true,
                symbolSize: 14,
            },
        ],
    }
    return options
}

export const generateGraphDataWithGPU = (data, type) => {
    const categoriesAndLegends = generateCategoriesAndLegendsFromRoot(type)
    const options = {
        legend: { data: categoriesAndLegends, itemHeight: 22 },
        tooltip: {},
        series: [
            {
                type: "graphGL",
                layout: "forceAtlas2",
                forceAtlas2: {
                    steps: 5,
                },
                nodes: data.nodes,
                categories: categoriesAndLegends,
                draggable: true,
                links: data.links,
            },
        ],
    }
    return options
}

export const generateCategoriesAndLegendsFromRoot = (type) => {
    const users = generateSymbolFromType("userid")
    const devices = generateSymbolFromType("deviceid")
    const cards = generateSymbolFromType("funding_channel")
    const rootUser = generateSymbolFromType("rootUser")
    const rootDevice = generateSymbolFromType("rootDevice")
    let defaultType = [
        {
            name: "Related Users",
            symbol: users,
            icon: users,
        },
        {
            name: "Related Devices",
            symbol: devices,
            icon: devices,
        },
        {
            name: "Related Card",
            symbol: cards,
            icon: cards,
        },
    ]
    if (type === "userid") {
        defaultType = [
            {
                name: "Root User",
                symbol: rootUser,
                icon: rootUser,
            },
            ...defaultType,
        ]
    } else if (type === "deviceid") {
        defaultType = [
            {
                name: "Root Device",
                symbol: rootDevice,
                icon: rootDevice,
            },
            ...defaultType,
        ]
    }
    return defaultType
}

export const generateCategoryFromType = (type) => {
    switch (type) {
        case "deviceid":
            return 2
        case "userid":
            return 1
        case "funding_channel":
            return 3
        default:
            return 0
    }
}

export const generateSymbolFromType = (type) => {
    switch (type) {
        case "rootDevice":
            return `image://${
                process.env.PUBLIC_URL + "/assets/icon/rootDevice.png"
            }`
        case "rootUser":
            return `image://${
                process.env.PUBLIC_URL + "/assets/icon/rootUser.png"
            }`
        case "deviceid":
            return `image://${
                process.env.PUBLIC_URL + "/assets/icon/smartphone.png"
            }`
        case "userid":
            return `image://${process.env.PUBLIC_URL + "/assets/icon/man.png"}`
        case "funding_channel":
            return `image://${
                process.env.PUBLIC_URL + "/assets/icon/credit-card.png"
            }`
        default:
            return ""
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
        const symbolSize = totalDegree
        newNodes.push({
            ...n,
            symbolSize: Math.log2(symbolSize + 2) * 5,
            value: symbolSize,
        })
    })
    return newNodes
}
