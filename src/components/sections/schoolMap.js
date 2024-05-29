import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import React, { useState, useRef } from 'react'

function schoolMap () {
    const [center, setCenter] = useState({ lat: 21.03770660949471, lng: 105.78341081141417 })
    const ZOOM_LEVEL = 17
    const mapRef = useRef()
    return (
        <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef} style={{ height: 600, zIndex: 0 }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {location.loaded && !location.error && (
                <Marker
                    position={[
                        location.coordinates.lat,
                        location.coordinates.lng,
                    ]}
                ></Marker>
            )}
        </MapContainer>
    );
}

export default schoolMap;
