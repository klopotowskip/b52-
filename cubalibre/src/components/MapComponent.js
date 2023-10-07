import {MapContainer, TileLayer, AttributionControl} from "react-leaflet";
import React, { useEffect, useState } from "react"
import DistrictMarkersComponent from "./DistrictMarkersComponent";
class MapComponent extends React.Component{

    render() {
        return <MapContainer center={[54.4269, 18.6976]} zoom={11} scrollWheelZoom={true}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <AttributionControl position="bottomleft" />
            <DistrictMarkersComponent />
        </MapContainer>
    }
}

export default MapComponent