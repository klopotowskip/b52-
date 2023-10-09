import React, { useState } from "react";
import './App.css';
import MapComponent from './components/MapComponent';
import HeaderComponent from "./components/HeaderComponent";
import SidebarComponent from "./components/SidebarComponent";

const App = () => {
    const [data, setData] = useState('')
    return (
        <>
            <HeaderComponent/>
            <MapComponent data={data} setData={setData} />
            <SidebarComponent data={data} setData={setData} />
        </>
    );
}

export default App;