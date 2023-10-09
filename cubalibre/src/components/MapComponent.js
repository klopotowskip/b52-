import {AttributionControl, MapContainer, TileLayer} from "react-leaflet";
import React from "react"
import DistrictMarkersComponent from "./DistrictMarkersComponent";

const MapComponent = ({data, setData}) => {

    return (<MapContainer center={[54.4269, 18.6976]} zoom={11} scrollWheelZoom={true}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <AttributionControl position="bottomleft"/>
        <DistrictMarkersComponent data={data} setData={setData} />
    </MapContainer>);
}

export default MapComponent