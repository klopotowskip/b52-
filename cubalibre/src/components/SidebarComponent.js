import React, {useState, useEffect} from "react";
import StatisticsGraphComponent from "./statistics/StatisticsGraphComponent";


const SidebarComponent = ({data, setData}) => {
    const [statistics, setStatistics] = useState({
        sale: [],
        rental: []
    })

    useEffect(() => {
        const fetchDistrictStatistics = async () => {
            if(data.id == null){
                return;
            }
            const rentalStatisticsResponse = await fetch("api/v1/rental/statistics/" + data.id);
            const rentalStatistics = await rentalStatisticsResponse.json();

            const saleStatisticsResponse = await fetch("api/v1/sale/statistics/" + data.id);
            const saleStatistics = await saleStatisticsResponse.json();

            setStatistics({
                sale: saleStatistics,
                rental: rentalStatistics
            });
        }

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

            <StatisticsGraphComponent statistics={statistics} />
        </div>
    );
}

export default SidebarComponent