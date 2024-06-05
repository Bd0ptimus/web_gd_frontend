import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import React, { useState, useRef } from 'react'

function schoolMap () {
    const [center, setCenter] = useState({ lat: 21.03770660949471, lng: 105.78341081141417 })
    const ZOOM_LEVEL = 17
    const mapRef = useRef()
    const position = [21.038198, 105.784213]

    return (
        <MapContainer center={center} zoom={ZOOM_LEVEL} style={{ height: 600, zIndex: 0 }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <Marker
                position={position}
            >
                <Popup>
                    Toà D3 - Trường Đại học Sư Phạm Hà Nội, 136 Xuân Thuỷ - Cầu Giấy - Hà Nội
                </Popup>
                
            </Marker>
        </MapContainer>
    );
}

export default schoolMap;
