import { Card } from "antd"
import Axios from "axios"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { generalSelector } from "../../../../../slices/general"
import { userSelector } from "../../../../../slices/user"
import "./index.css"

export default function CardNetwork() {
    const { id } = useSelector(generalSelector)
    const { filters } = useSelector(userSelector)
    useEffect(() => {
        Axios.post("http://localhost:8085/api/profile/user/network/account", {
            id: `userid/${id}`,
            fromDate: filters.range[0],
            toDate: filters.range[1],
        }).then((response) => {
            const links_ = response.data
                .map((x) => {
                    return x.userList.map((d) => ({
                        source: x.accountId,
                        target: d.split("/")[1],
                    }))
                })
                .flat()
                .map((x) => [x.source, x.target, 1])
            const sortNow = () => {
                const sortOrder = response.data
                    .sort((a, b) => a.userListLength - b.userListLength)
                    .map((x) => x.accountId)
                return function (a, b) {
                    return window.d3.descending(
                        sortOrder.indexOf(a),
                        sortOrder.indexOf(b)
                    )
                }
            }

            const bP = window.viz
                .biPartite()
                .pad(4)
                .width(400)
                .height(400)
                .sortPrimary(sortNow())
                .data(links_)
            const bPg = window.d3.select("g#account").call(bP)

            bPg.append("text")
                .attr("x", -50)
                .attr("y", -8)
                .style("text-anchor", "middle")
                .text("Account")

            bPg.append("text")
                .attr("x", 550)
                .attr("y", -8)
                .style("text-anchor", "middle")
                .text("User")

            bPg.append("line").attr("x1", -100).attr("x2", 0)

            bPg.append("line").attr("x1", 500).attr("x2", 600)

            bPg.selectAll(".viz-biPartite-mainBar")
                .append("text")
                .attr("fill", "black")
                .attr("font-size", "10px")
                .attr("x", (d) => (d.part === "primary" ? -30 : 30))
                .attr("y", (d) => 6)
                .attr("text-anchor", (d) =>
                    d.part === "primary" ? "end" : "start"
                )
                .text((d) => d.key)

            // bPg.selectAll(".viz-biPartite-mainBar")
            //     .append("text")
            //     .attr("fill", "black")
            //     .attr("font-size", "10px")
            //     .attr("x", (d) => (d.part === "primary" ? -150 : 140))
            //     .attr("y", (d) => 6)
            //     .attr("text-anchor", (d) =>
            //         d.part === "primary" ? "end" : "start"
            //     )
            //     .text((d) => window.d3.format("0.0%")(d.percent))

            bPg.selectAll(".viz-biPartite-mainBar")
                .on("mouseover", mouseover)
                .on("mouseout", mouseout)

            function mouseover(d) {
                bP.mouseover(d)

                bPg.selectAll(".viz-biPartite-mainBar")
                    .filter((d) => d.part === "primary")
                    .select(".perc")
                    .text(function (d) {
                        return window.d3.format(".0%")(d.percent)
                    })
                if (d.part === "primary") {
                    bPg.selectAll(".viz-biPartite-mainBar")
                        .filter(
                            (d) => d.part === "secondary" && d.percent === 0
                        )
                        .style("visibility", "hidden")
                } else {
                    bPg.selectAll(".viz-biPartite-mainBar")
                        .filter((d) => d.part === "primary" && d.percent === 0)
                        .style("visibility", "hidden")
                }
            }

            function mouseout(d) {
                bP.mouseout(d)

                bPg.selectAll(".viz-biPartite-mainBar")
                    .filter((d) => d.part === "primary")
                    .select(".perc")
                    .text(function (d) {
                        return window.d3.format(".0%")(d.percent)
                    })

                bPg.selectAll(".viz-biPartite-mainBar").style(
                    "visibility",
                    "visible"
                )
            }
        })
    }, [id, filters])

    return (
        <Card>
            <svg style={{ width: 3000, height: 5000 }}>
                <g id='account' transform='translate(120, 50)'></g>
            </svg>
        </Card>
    )
}
