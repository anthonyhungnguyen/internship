import { Card, Skeleton, Slider } from "antd"
import axios from "axios"
import ReactEchartsCore from "echarts-for-react"
import echarts from "echarts/lib/echarts"
import React, { useEffect, useRef, useState } from "react"
import {
    configureSymbolSizeBasedOnDegree,
    generateCategoryFromType,
    generateGraphData,
    preprocessMoreConnection,
} from "../../../../../../slices/util"

export default function Graph({ userList }) {
    const [graphData, setGraphData] = useState(null)

    let depthData = {}
    depthData[1] = graphData

    let ref = useRef()

    useEffect(() => {
        const fetchConnections = async () => {
            axios
                .post("http://localhost:8085/api/profile/depth", {
                    idList: userList.map((x) => "users/" + x),
                })
                .then((response) => {
                    const preConnections = preprocessConnection(
                        userList,
                        response.data
                    )
                    const graphData = generateGraphData(preConnections, "users")
                    setGraphData(graphData)
                })
                .catch(console.error)
        }

        fetchConnections()
    }, [userList])

    const preprocessConnection = (idList, connections) => {
        let nodes = idList.map((u) => ({
            id: u,
            name: u,
            category: 0,
            type: "user",
            expanded: true,
        }))
        const links = []
        const nodeCount = [...idList]
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
            if (!links.find((x) => x.source === from && x.target === to)) {
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

    const expandOneDepth = async (depth) => {
        let echartsInstance = ref.current.getEchartsInstance()
        const { data, edges } = echartsInstance.getOption()["series"][0]
        if (!depthData[depth]) {
            const unExpandedId = data
                .filter((x) => !x.expanded)
                .map((x) => `${x.type}/${x.id}`)
            if (unExpandedId.length !== 0) {
                axios
                    .post("http://localhost:8085/api/profile/depth", {
                        idList: unExpandedId,
                    })
                    .then((response) => {
                        const moreConnection = preprocessMoreConnection(
                            response.data,
                            data,
                            edges
                        )
                        const newGraphData = generateGraphData(
                            moreConnection,
                            "users"
                        )
                        depthData[depth] = newGraphData
                        echartsInstance.setOption(newGraphData)
                    })
                    .catch(console.error)
            }
        } else {
            echartsInstance.setOption(depthData[depth])
        }
    }

    return (
        <Card
            className='mt-2'
            headStyle={{ fontWeight: "bold", fontSize: "1.3em" }}
            hoverable={true}
        >
            <Slider
                min={1}
                max={10}
                onChange={expandOneDepth}
                className='w-40'
                tooltipVisible
            />
            {graphData ? (
                <ReactEchartsCore
                    ref={ref}
                    echarts={echarts}
                    option={graphData}
                    style={{ height: "500px", width: "100%" }}
                    notMerge={true}
                />
            ) : (
                <Skeleton />
            )}
        </Card>
    )
}
