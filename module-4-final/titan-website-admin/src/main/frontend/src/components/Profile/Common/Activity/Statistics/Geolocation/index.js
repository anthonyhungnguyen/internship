import { Card, Col, Divider, Row, Statistic } from "antd"
import Axios from "axios"
import React, { memo, useEffect, useState } from "react"

export default memo(function Geolocation({ id, filters }) {
    const [geolocation, setGeolocation] = useState(null)
    const [formattedAddress, setFormattedAddress] = useState("Unknown")
    useEffect(() => {
        Axios.post(`http://localhost:8085/api/profile/user/${id}/geolocation`, {
            fromDate: filters.range[0],
            toDate: filters.range[1],
        })
            .then(async (response) => {
                console.log(response)
                setGeolocation(response.data)
                getPopularGeolocation(
                    response.data
                        ? response.data.sort(
                              (a, b) => a.location_count - b.location_count
                          )[0]
                        : null
                )
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id, filters])

    const getPopularGeolocation = async (data) => {
        if (data) {
            await Axios.post(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.lat},${data.lng}&key=AIzaSyBwYcyKKgLLdQRapd9VL20iERA3FqXNhJ4`
            )
                .then((response) => {
                    setFormattedAddress(
                        response.data.results[0].formatted_address
                    )
                })
                .catch(console.error)
        } else {
            setFormattedAddress("Unknown")
        }
    }

    return (
        <Card className='h-full' hoverable={true}>
            <Statistic
                title='Geolocation'
                value={
                    geolocation && geolocation.length > 0
                        ? geolocation
                              .map((x) => x.location_count)
                              .reduce((a, b) => a + b)
                        : 0
                }
                suffix='times'
            />
            <Divider />
            <Row>
                <Col span={24}>
                    <Statistic
                        title='Peak location'
                        value={formattedAddress}
                        valueStyle={{ color: "#e67e22", fontSize: "12.5px" }}
                    />
                </Col>
            </Row>
        </Card>
    )
})
