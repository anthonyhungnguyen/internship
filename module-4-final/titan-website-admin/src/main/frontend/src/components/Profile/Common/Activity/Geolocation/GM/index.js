import React, { memo, useEffect, useRef, useState } from "react"
import GoogleMapReact from "google-map-react"
import { Card } from "antd"
import Axios from "axios"

export default memo(function GoogleMapGeolocation({ id, type, filters }) {
    const [data, setData] = useState([])
    const [map, setMap] = useState(null)
    const [maps, setMaps] = useState(null)
    const [currentHeatmap, setCurrentHeatmap] = useState(null)

    useEffect(() => {
        Axios.post(`http://localhost:8085/api/profile/user/${id}/geolocation`, {
            fromDate: filters.range[0],
            toDate: filters.range[1],
        })
            .then((response) => {
                setData(response.data)
                fitBoundsAndRenderHeatMap(response.data, map, maps)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id, filters])

    const fitBoundsAndRenderHeatMap = (data, map, maps) => {
        const markers = data.map((x) => new maps.LatLng(x.lat, x.lng))
        const bounds = new maps.LatLngBounds()
        markers.forEach((m) => bounds.extend(m))
        map.fitBounds(bounds)
        if (currentHeatmap) {
            currentHeatmap.setMap(null)
        }
        const heatmap = new maps.visualization.HeatmapLayer({
            data: markers,
            radius: 20,
        })
        heatmap.setMap(map)
        setCurrentHeatmap(heatmap)
    }
    return (
        <Card
            style={{ width: "100%", height: "50vh" }}
            bodyStyle={{ height: "100%" }}
        >
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: "AIzaSyDmbl-UzpILeyTFM5_UbvCRiLHa5-6yhpU",
                    libraries: ["visualization"],
                }}
                defaultCenter={{
                    lat: 59.95,
                    lng: 30.33,
                }}
                zoom={11}
                options={{
                    mapTypeControl: true,
                    panControl: false,
                    scrollwheel: true,
                }}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => {
                    setMap(map)
                    setMaps(maps)
                    fitBoundsAndRenderHeatMap(data, map, maps)
                }}
            ></GoogleMapReact>
        </Card>
    )
})
