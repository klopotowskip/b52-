import React, {useState, useEffect} from "react";
import SaleStatisticsComponent from "./statistics/SaleStatisticsComponent";


const SidebarComponent = ({data, setData}) => {
    const [rentalStatistics, setRentalStatistics] = useState([])
    const [saleStatistics, setSaleStatistics] = useState([])


    const fetchDistrictStatistics = async () => {
        if(data.id == null){
            return;
        }
        const rentalStatisticsResponse = await fetch("api/v1/rental/statistics/" + data.id);
        const rentalStatistics = await rentalStatisticsResponse.json();

        setRentalStatistics(rentalStatistics);

        const saleStatisticsResponse = await fetch("api/v1/sale/statistics/" + data.id);
        const saleStatistics = await saleStatisticsResponse.json();

        setSaleStatistics(saleStatistics);
    }

    useEffect(() => {
        fetchDistrictStatistics().catch(() => {
            ////TODO: Add alert
            alert("Error!");
        })
    }, [data])

    const EMPTY = ({
        "id": null,
        "name": null,
        "city": null
    })
    if (data.id == null) return (<></>);


    const closeSidebar = () => {
        setData(EMPTY)
    }

    return (
        <div className="sidebar-component">
            <button className="btn-floating btn-large waves-effect waves-light red sidebar-component__close-button"><i
                className="material-icons" onClick={closeSidebar}>close</i></button>

            <h2 className="sidebar-component__title">{data.name}</h2>
            <h3 className="sidebar-component__subtitle">{data.city}</h3>

            <SaleStatisticsComponent saleStatistics={saleStatistics} />
        </div>
    );
}

export default SidebarComponent