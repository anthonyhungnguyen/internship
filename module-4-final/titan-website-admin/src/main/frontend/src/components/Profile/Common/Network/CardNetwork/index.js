import Axios from "axios"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { generalSelector } from "../../../../../slices/general"
import "./index.css"

export default function CardNetwork() {
    const { id } = useSelector(generalSelector)

    useEffect(() => {
        const fetchNetworkCard = async () => {
            await Axios.post(
                "http://localhost:8085/api/profile/user/network/card",
                {
                    id: `userid/${id}`,
                }
            ).then((response) => {
                const links_ = response.data
                    .map((x) => {
                        return x.userList.map((d) => ({
                            source: x.cardId,
                            target: d.split("/")[1],
                        }))
                    })
                    .flat()
                    .map((x) => [x.source, x.target, 1])

                const bP = window.viz
                    .biPartite()
                    .width(1000)
                    .pad(4)
                    .height(2000)
                    .sortPrimary(sortNow(response.data))
                    .data(links_)
                const bPg = window.d3.select("g").call(bP)

                bPg.append("text")
                    .attr("x", -50)
                    .attr("y", 0)
                    .attr("text-anchor", "middle")
                    .text("Card ID")

                bPg.append("text").attr("x", 1000).attr("y", 0).text("User ID")

                bPg.selectAll(".viz-biPartite-mainBar")
                    .filter((d) => d.part === "secondary")
                    .append("text")
                    .attr("fill", "black")
                    .attr("text-anchor", "start")
                    .attr("font-size", "10px")
                    .attr("x", 36)
                    .text((d) => d.key)

                bPg.selectAll(".viz-biPartite-mainBar")
                    .filter((d) => d.part === "primary")
                    .append("text")
                    .attr("fill", "black")
                    .attr("text-anchor", "end")
                    .attr("font-size", "10px")
                    .attr("x", -36)
                    .text((d) => d.key)

                // bPg.selectAll(".viz-biPartite-mainBar")
                //     .append("text")
                //     .attr("class", "perc")
                //     .text(function (d) {
                //         return window.d3.format(".0%")(d.percent)
                //     })

                bPg.selectAll(".viz-biPartite-mainBar")
                    .on("mouseover", mouseover)
                    .on("mouseout", mouseout)

                function mouseover(d) {
                    bP.mouseover(d)

                    // bPg.selectAll(".viz-biPartite-mainBar")
                    //     .select(".perc")
                    //     .text(function (d) {
                    //         return window.d3.format(".0%")(d.percent)
                    //     })
                    if (d.part === "primary") {
                        bPg.selectAll(".viz-biPartite-mainBar")
                            .filter(
                                (d) => d.part === "secondary" && d.percent === 0
                            )
                            .style("visibility", "hidden")
                    } else {
                        bPg.selectAll(".viz-biPartite-mainBar")
                            .filter(
                                (d) => d.part === "primary" && d.percent === 0
                            )
                            .style("visibility", "hidden")
                    }
                }

                function mouseout(d) {
                    bP.mouseout(d)

                    // bPg.selectAll(".viz-biPartite-mainBar")
                    //     .select(".perc")
                    //     .text(function (d) {
                    //         return window.d3.format(".0%")(d.percent)
                    //     })

                    bPg.selectAll(".viz-biPartite-mainBar").style(
                        "visibility",
                        "visible"
                    )
                }
            })
        }

        const sortNow = (data) => {
            const sortOrder = data
                .sort((a, b) => a.userListLength - b.userListLength)
                .map((x) => x.cardId)
            return function (a, b) {
                return window.d3.descending(
                    sortOrder.indexOf(a),
                    sortOrder.indexOf(b)
                )
            }
        }

        fetchNetworkCard()
    }, [])

    return (
        <div>
            <svg style={{ width: 3000, height: 5000 }}>
                <g transform='translate(250, 50)'></g>
            </svg>
        </div>
    )
}
