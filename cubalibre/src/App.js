import React from "react";
import './App.css';
import MapComponent from './components/MapComponent';
import HeaderComponent from "./components/HeaderComponent";
import SidebarComponent from "./components/SidebarComponent";

const App = () => {
    return (
        <>
            <HeaderComponent/>
            <MapComponent />
            <SidebarComponent />
        </>
    );
}

export default App;