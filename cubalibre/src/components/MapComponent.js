import {MapContainer, TileLayer, AttributionControl} from "react-leaflet";
import React, { useEffect, useState } from "react"

class MapComponent extends React.Component{

    render() {
        return <MapContainer center={[54.4269, 18.5676]} zoom={10} scrollWheelZoom={true}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <AttributionControl position="bottomleft" />
        </MapContainer>
    }
}

export default MapComponent