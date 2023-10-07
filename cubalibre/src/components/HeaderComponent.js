import {MapContainer, TileLayer} from "react-leaflet";
import React from "react";

class HeaderComponent extends React.Component{
    render(){
        return <nav>
            <div className="nav-wrapper">
                <a href="#" className="brand-logo">Housintelligence</a>
            </div>
        </nav>
    }
}

export default HeaderComponent