import { Button, Card } from "antd"
import Axios from "axios"
import GoogleMapReact from "google-map-react"
import React, { memo, useEffect, useState } from "react"

export default memo(function GoogleMapGeolocation({ id, type, filters }) {
    const [data, setData] = useState([])
    const [map, setMap] = useState(null)
    const [maps, setMaps] = useState(null)
    const [currentHeatmap, setCurrentHeatmap] = useState(null)
    const [currentBounds, setCurrentBounds] = useState(null)

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
        const markers = data.map((x) => ({
            location: new maps.LatLng(x.lat, x.lng),
            weight: parseInt(x.location_count),
        }))
        const bounds = new maps.LatLngBounds()
        markers.forEach((m) => bounds.extend(m.location))
        setCurrentBounds(bounds)
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
            style={{ width: "100%", height: "70vh" }}
            bodyStyle={{ height: "90%" }}
            title='Geolocation'
            headStyle={{ fontWeight: "bold", fontSize: "1.3em" }}
            extra={
                <Button
                    onClick={() => map.fitBounds(currentBounds)}
                    type='primary'
                >
                    Zoom Back
                </Button>
            }
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
                    mapTypeId: "satellite",
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
