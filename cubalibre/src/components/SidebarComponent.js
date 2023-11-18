import React, {useState, useEffect} from "react";
import StatisticsGraphComponent from "./statistics/StatisticsGraphComponent";
import IndexesGraphComponent from "./statistics/IndexesGraphComponent";

const ENTRY_DATE_KEY = "entryDateYearMonth";
const ENTRY_PRICE_KEY = "latestPrice";

const SALE_PRICE_KEY = "salePrice";
const RENTAL_PRICE_KEY = "rentalPrice";

const VALUE_KEY = "value";

const SidebarComponent = ({data, setData}) => {
    const [statistics, setStatistics] = useState({
        sale: [],
        rental: [],
        ppValue: [],
        yieldValue: []
    })

    const extractCommonRentalSaleData = (saleStatistics, rentalStatistics) => {
        const commonYearMonthsData = [];
        for(let i in saleStatistics){
            for(let j in rentalStatistics){
                if(saleStatistics[i][ENTRY_DATE_KEY] === rentalStatistics[j][ENTRY_DATE_KEY]){
                    commonYearMonthsData.push({
                        [ENTRY_DATE_KEY]: saleStatistics[i][ENTRY_DATE_KEY],
                        [SALE_PRICE_KEY]: saleStatistics[i][ENTRY_PRICE_KEY],
                        [RENTAL_PRICE_KEY]: rentalStatistics[j][ENTRY_PRICE_KEY]
                    });
                    break;
                }
            }

        }
        return commonYearMonthsData;
    }

    const round = (number, scale=2) => {
        const s = Math.pow(10, scale);
        return Math.round((number + Number.EPSILON) * s) / s;
    }

    const PP = (cost, monthlyIncome) => {
        return cost / (12 * monthlyIncome);
    }

    const YIELD = (cost, monthlyIncome) => {
        return (12 * monthlyIncome) / cost;
    }

    const calculatePpForObservations = (commonData) => {
        const observations = []
        for(let i in commonData){
            observations.push({
                [ENTRY_DATE_KEY]: commonData[i][ENTRY_DATE_KEY],
                [VALUE_KEY]: round(PP(commonData[i][SALE_PRICE_KEY], commonData[i][RENTAL_PRICE_KEY])),
            });
        }
        return observations;
    }

    const calculateYieldForObservations = (commonData) => {
        const observations = []
        for(let i in commonData){
            observations.push({
                [ENTRY_DATE_KEY]: commonData[i][ENTRY_DATE_KEY],
                [VALUE_KEY]: round(YIELD(commonData[i][SALE_PRICE_KEY], commonData[i][RENTAL_PRICE_KEY]), 4),
            });
        }
        return observations;
    }

    useEffect(() => {
        const fetchDistrictStatistics = async () => {
            if(data.id == null){
                return;
            }
            const rentalStatisticsResponse = await fetch("api/v1/rental/statistics/" + data.id);
            const rentalStatistics = await rentalStatisticsResponse.json();

            const saleStatisticsResponse = await fetch("api/v1/sale/statistics/" + data.id);
            const saleStatistics = await saleStatisticsResponse.json();

            const commonData = extractCommonRentalSaleData(saleStatistics, rentalStatistics);

            setStatistics({
                sale: saleStatistics,
                rental: rentalStatistics,
                ppValue: calculatePpForObservations(commonData),
                yieldValue: calculateYieldForObservations(commonData)
            });


        }

        fetchDistrictStatistics().catch((e) => {
            ////TODO: Add alert
            console.error("Error!: ", e);
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
            <IndexesGraphComponent statistics={statistics} />
        </div>
    );
}

export default SidebarComponent