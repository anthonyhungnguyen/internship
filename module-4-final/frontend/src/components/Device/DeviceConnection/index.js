import { Graph } from "react-d3-graph";
import React from 'react'
export default () => {
    // graph payload (with minimalist structure)
    const data = {
        nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
        links: [
            { source: "Harry", target: "Sally" },
            { source: "Harry", target: "Alice" },
        ],
    };

    // the graph configuration, you only need to pass down properties
    // that you want to override, otherwise default ones will be used
    const myConfig = {
        nodeHighlightBehavior: true,
        node: {
            color: "lightgreen",
            size: 120,
            highlightStrokeColor: "blue",
        },
        link: {
            highlightColor: "lightblue",
        },
        height: window.innerHeight,
        width: window.innerWidth,
        focusZoom: 2
    };

    // graph event callbacks

    return (
        <div className="flex justify-center items-center">
            <Graph
                id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                data={data}
                config={myConfig}
            />
        </div>
    )
}
