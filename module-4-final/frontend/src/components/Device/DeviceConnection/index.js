import { Graph } from "react-d3-graph";
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { deviceConnectionSelector, fetchConnection, insertConnectionData } from "../../../slices/device_connection";
import { deviceSelector } from "../../../slices/device";
import ReactEcharts from 'echarts-for-react'
export default () => {
    // graph payload (with minimalist structure)

    const dispatch = useDispatch()
    const { connections, data } = useSelector(deviceConnectionSelector)
    const { deviceId } = useSelector(deviceSelector)
    useEffect(() => {
        dispatch(fetchConnection(deviceId))
    }, [dispatch, deviceId])

    useEffect(() => {
        const preprocessConnections = () => {
            const nodes = [{
                name: deviceId,
                category: 0

            }]
            const links = []
            const nodeCount = [deviceId.trim()]
            connections.forEach((c) => {
                const device = c['from'].split('/')[1].trim()
                const user = c['to'].split('/')[1].trim()
                if (nodeCount.indexOf(device) < 0) {
                    nodes.push({
                        name: device,
                        category: 2
                    })
                    nodeCount.push(device)
                }
                if (nodeCount.indexOf(user) < 0) {
                    nodes.push({
                        name: user,
                        category: 1
                    })
                    nodeCount.push(user)
                }
                links.push({
                    source: device,
                    target: user
                })
            })
            dispatch(insertConnectionData({
                nodes: nodes,
                links: links,
            }))
        }

        preprocessConnections()
    }, [connections])

    const getOption = () => {
        const webkitDep = {
            type: "force",
            categories: [{
                name: 'Root Device',
            }, {
                name: 'Users'
            }, {
                name: 'Related Devices'
            }],
            nodes: data.nodes,
            links: data.links
        }
        const options = {
            title: {
                text: 'Device Depth 2'
            },
            legend: {
                data: ['Root Device', 'Users', 'Related Devices']
            },
            series: [{
                type: 'graph',
                layout: 'force',
                animation: false,
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter: '{b}'
                    }
                },
                draggable: true,
                data: webkitDep.nodes.map(function (node) {
                    return { ...node, id: node.name };
                }),
                categories: webkitDep.categories,
                force: {
                    // initLayout: 'circular'
                    // repulsion: 20,
                    edgeLength: 300,
                    repulsion: 300,
                    gravity: 0.1,
                    friction: 0.1
                },
                edges: webkitDep.links,
                roam: true,
                symbolSize: 15,
                draggable: true,
            }]
        };
        return options
    };

    const handleOnClick = (e) => {
        console.log(e)
    }

    const handleRenderGraph = () => {
        if ('nodes' in data && data.nodes.length > 0 && data.links.length > 0) {
            return (<ReactEcharts
                option={getOption()}
                style={{ height: '100vh', width: '100%' }}
                className='react_for_echarts w-2/3'
                onEvents={{
                    click: handleOnClick
                }} />)
        } else {
            return null
        }
    }

    return <div className='examples'>
        <div className='parent flex'>
            {handleRenderGraph()}
            <div className="h-screen w-1/3 p-4">
                <p className="font-bold">Device Details</p>
                <div className="flex text-gray-700 my-3">
                    <span className={'w-1/3 font-bold'}>ID</span>
                    <span className={'w-2/3'}>460968F8-068F-41C8-B130-2F5F7E968C9C</span>
                </div>
            </div>
        </div>
    </div>

}
