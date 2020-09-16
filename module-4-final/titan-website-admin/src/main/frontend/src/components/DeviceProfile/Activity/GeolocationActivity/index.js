import React, { useState } from 'react'
import { Card, Modal } from 'antd'
import GoogleMapReact from 'google-map-react';
import './index.css'
import { useSelector } from 'react-redux'
import { deviceActivitySelector } from '../../../../slices/deviceActivity';

export default (() => {
    const { geolocationActivity } = useSelector(deviceActivitySelector)
    const [visible, setVisible] = useState(false)

    const defaultCenter = {
        lat: 16.423766,
        lng: 107.468177
    }

    const defaultZoom = 5

    const handleToggleVisible = () => {
        setVisible((old) => !old)
    }

    return (
        <React.Fragment>
            <Card
                title="Geolocation Activity"
                headStyle={{ fontWeight: 'bold', fontSize: '1.3em' }}
                hoverable={true}
                onClick={handleToggleVisible}
                className="w-full h-full"
            >
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDmbl-UzpILeyTFM5_UbvCRiLHa5-6yhpU" }}
                    defaultCenter={defaultCenter}
                    defaultZoom={defaultZoom}
                >
                    {geolocationActivity.map((gl => (
                        <p
                            lat={gl.lat}
                            lng={gl.lng}
                            className="text-3xl text-red-700 w-4 h-4 bg-red-700 rounded-full"
                        />
                    )))}
                </GoogleMapReact>
            </Card>
            <Modal
                title="Geolocation Activity"
                visible={visible}
                onOk={handleToggleVisible}
                onCancel={handleToggleVisible}
                centered
                width={1000}
                height={800}
            >
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDmbl-UzpILeyTFM5_UbvCRiLHa5-6yhpU" }}
                    defaultCenter={defaultCenter}
                    defaultZoom={defaultZoom}
                >
                    {geolocationActivity.map((gl => (
                        <p
                            lat={gl.lat}
                            lng={gl.lng}
                            className="text-3xl text-red-700 w-4 h-4 bg-red-700 rounded-full"
                        />
                    )))}
                </GoogleMapReact>
            </Modal>
        </React.Fragment>


    )
}) 