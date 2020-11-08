import { Card, Slider } from "antd"
import axios from "axios"
import copy from "copy-to-clipboard"
import ReactEcharts from "echarts-for-react"
import "echarts-gl"
import { useSelector } from "react-redux"
import React, { memo, useEffect, useRef, useState } from "react"
import { generalSelector } from "../../../../../slices"
import {
    configureSymbolSizeBasedOnDegree,
    generateCategoryFromType,
    generateGraphData,
    generateGraphDataWithGPU,
    preprocessMoreConnection,
} from "../../../../../slices/util"

let depthData = {}
export default memo(function Graph({
    setCurrentChosenId,
    setCurrentType,
    id,
    type,
}) {
    // Used for restoring old depth
    const { useGPU } = useSelector(generalSelector)
    const [graphData, setgraphData] = useState([])
    let ref = useRef()
    useEffect(() => {
        depthData = {}
        axios
            .post("http://localhost:8085/api/profile/depth", {
                idList: [`userid/${id}`],
            })
            .then((response) => {
                const formattedConnections = preprocessConnection(
                    `userid/${id}`,
                    response.data
                )
                const graphData = !useGPU
                    ? generateGraphData(formattedConnections, "userid")
                    : generateGraphDataWithGPU(formattedConnections, "userid")
                setgraphData(graphData)
                depthData[1] = graphData
            })
            .catch(console.error)

        const preprocessConnection = (id, connections) => {
            const sourceType = id.split("/")[0].trim()
            const source = id.split("/")[1].trim()
            let nodes = [
                {
                    id: source,
                    name: source,
                    category: 0,
                    type: sourceType,
                    expanded: true,
                    label: {
                        fontWeight: "bold",
                    },
                    symbolSize: connections.length,
                    value: connections.length,
                },
            ]
            const links = []

            connections.forEach((c) => {
                const type = c["target"].split("/")[0].trim()
                const target = c["target"].split("/")[1].trim()
                nodes.push({
                    id: target,
                    name: target,
                    category: generateCategoryFromType(type),
                    type: type,
                    expanded: false,
                })

                links.push({
                    source: source,
                    target: target,
                })
            })
            let newNodes = configureSymbolSizeBasedOnDegree(nodes, links)
            return {
                nodes: newNodes,
                links: links,
            }
        }
    }, [id, useGPU])

    const handleOnClick = async (e) => {
        if (e.data.type === "deviceid") {
            copy(e.data.id.trim())
            setCurrentChosenId(e.data.id.trim())
            setCurrentType(e.data.type)
        } else if (e.data.type === "userid") {
            copy(e.data.id.trim())
            setCurrentChosenId(e.data.id.trim())
            setCurrentType(e.data.type)
        } else if (e.data.type === "funding_channel") {
            copy(e.data.id.trim())
            setCurrentChosenId(e.data.id.trim())
            setCurrentType(e.data.type)
        }
    }

    const expandOneDepth = async (depth) => {
        let echartsInstance = ref.current.getEchartsInstance()
        const { nodes, links } = echartsInstance.getOption()["series"][0]
        const unExpandedId = nodes
            .filter((x) => !x.expanded)
            .map((x) => `${x.type}/${x.id}`)
        if (!depthData[depth]) {
            if (unExpandedId.length !== 0) {
                axios
                    .post("http://localhost:8085/api/profile/depth", {
                        idList: unExpandedId,
                    })
                    .then((response) => {
                        const moreConnection = preprocessMoreConnection(
                            response.data,
                            nodes,
                            links
                        )
                        const newGraphData = !useGPU
                            ? generateGraphData(moreConnection, type)
                            : generateGraphDataWithGPU(moreConnection, type)
                        depthData[depth] = newGraphData
                        setgraphData(newGraphData)
                        // echartsInstance.setOption(newGraphData)
                    })
                    .catch(console.error)
            }
        } else {
            echartsInstance.setOption(depthData[depth])
        }
    }

    const expandOneDepthOnOneNode = async (id) => {
        let echartsInstance = ref.current.getEchartsInstance()
        const { nodes, links } = echartsInstance.getOption()["series"][0]
        const checkExpanded = nodes.find((x) => x.id !== id && !x.expanded)
        if (checkExpanded) {
            axios
                .post("http://localhost:8085/api/profile/depth", {
                    idList: [id],
                })
                .then((response) => {
                    const moreConnection = preprocessMoreConnection(
                        response.data,
                        nodes,
                        links
                    )
                    const newGraphData = !useGPU
                        ? generateGraphData(moreConnection, type)
                        : generateGraphDataWithGPU(moreConnection, type)
                    echartsInstance.setOption(newGraphData)
                })
                .catch(console.error)
        }
    }

    const handleDoubleClick = async (e) => {
        expandOneDepthOnOneNode(`${e.data.type}/${e.data.id}`)
    }

    return (
        graphData && (
            <Card
                className='h-full w-full'
                title='Graph'
                className='overflow-scroll'
                headStyle={{ fontWeight: "bold", fontSize: "1.3em" }}
                bodyStyle={{ height: "100vh" }}
                hoverable={true}
                extra={
                    <React.Fragment>
                        <Slider
                            min={1}
                            max={10}
                            onChange={expandOneDepth}
                            className='w-40'
                            tooltipVisible
                        />
                    </React.Fragment>
                }
            >
                <ReactEcharts
                    ref={ref}
                    option={graphData}
                    lazyUpdate={true}
                    style={{ height: "100%", width: "100%" }}
                    renderer='canvas'
                    onEvents={{
                        click: handleOnClick,
                        dblclick: handleDoubleClick,
                    }}
                />
            </Card>
        )
    )
})
