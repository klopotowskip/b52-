import React, {useState} from "react";

import {Line} from "react-chartjs-2";
import Chart from "chart.js/auto";
import {CategoryScale, LinearScale} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { pl } from 'date-fns/locale';

const MARKET_SALE = "sale";
const MARKET_RENTAL = "rental";

const PRICE = "latestPrice";
const PRICE_PER_SQ_M = "latestPricePerSquareMeter";
const SIZE = "sizeSquareMeters";

const CHART_META = {
    [MARKET_SALE] : {
        [PRICE]: {
            "title": "Properties for sale -- median price [PLN]",
            "xLabel": "Month-Year",
            "yLabel": "PLN"
        },
        [PRICE_PER_SQ_M]: {
            "title": "Properties for sale -- median price per square meter [PLN/m²]",
            "xLabel": "Month-Year",
            "yLabel": "PLN/m²"
        },
        [SIZE]: {
            "title": "Properties for sale -- median size [m²]",
            "xLabel": "Month-Year",
            "yLabel": "m²"
        },
    },
    [MARKET_RENTAL] : {
        [PRICE]: {
            "title": "Properties for rent -- median monthly rent [PLN]",
            "xLabel": "Month-Year",
            "yLabel": "PLN"
        },
        [PRICE_PER_SQ_M]: {
            "title": "Properties for rent -- median monthly rent per square meter [PLN/m²]",
            "xLabel": "Month-Year",
            "yLabel": "PLN/m²"
        },
        [SIZE]: {
            "title": "Properties for rent -- median size [m²]",
            "xLabel": "Month-Year",
            "yLabel": "m²"
        },
    }
};



const StatisticsGraphComponent = ({statistics}) => {
    Chart.register(CategoryScale, LinearScale);

    const [chartData, setChartData] = useState({
        market: MARKET_SALE,
        key: PRICE,
    });

    const onSaleClicked = () => {
        setChartData({
            market: MARKET_SALE,
            key: chartData.key,
        });
    }

    const onRentalClicked = () => {
        setChartData({
            market: MARKET_RENTAL,
            key: chartData.key
        });
    }

    const onPriceClicked = () => {
        setChartData({
            market: chartData.market,
            key: PRICE
        });
    };

    const onPricePerSquareMeterClicked = () => {
        setChartData({
            market: chartData.market,
            key: PRICE_PER_SQ_M
        });
    };

    const onSizeClicked = () => {
        setChartData({
            market: chartData.market,
            key: SIZE
        });
    };



    if(statistics.sale == null){
        return;
    }

    return (
        <div className="sidebar-component__statistics">
            <h4 className="sidebar-component__section-title">Statistics</h4>
            <hr className="sidebar-component__statistics__tabs_separator" />
            <span className="sidebar-component__statistics__tabs_title">Market</span>
            <ul className="tabs sidebar-component__statistics__tabs">
                <li className="tab col s3"><a href="#" onClick={onSaleClicked} className={chartData.market === MARKET_SALE ? "active": ""}>Sale</a></li>
                <li className="tab col s3"><a href="#" onClick={onRentalClicked} className={chartData.market === MARKET_RENTAL ? "active": ""}>Rental</a></li>
            </ul>
            <hr className="sidebar-component__statistics__tabs_separator" />
            <span className="sidebar-component__statistics__tabs_title">Statistic</span>
            <ul className="tabs sidebar-component__statistics__tabs">
                <li className="tab col s3">
                    <a href="#" onClick={onPriceClicked} className={chartData.key === PRICE ? "active": ""}>Price</a>
                </li>
                <li className="tab col s3">
                    <a href="#" onClick={onPricePerSquareMeterClicked} className={chartData.key === PRICE_PER_SQ_M ? "active": ""}>Price/m<sup>2</sup></a>
                </li>
                <li className="tab col s3">
                    <a href="#" onClick={onSizeClicked} className={chartData.key === SIZE ? "active": ""}>Area</a>
                </li>
            </ul>
            {statistics[chartData.market].map(entry => entry[chartData.key]).length !== 0 ? (<Line
                data={{
                    labels: statistics[chartData.market].map(entry => new Date(entry['entryDateYearMonth'] + "-01")),
                    datasets: [{
                        label: CHART_META[chartData.market][chartData.key].title,
                        data: statistics[chartData.market].map(entry => entry[chartData.key]),
                        borderColor: "#ee6e73",
                        fill: false,
                        cubicInterpolationMode: 'monotone',
                        tension: 0.4
                    }]
                }}
                options={{
                    interactive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: CHART_META[chartData.market][chartData.key].title
                        },
                        legend: {
                            display: false
                        },
                    },
                    scales: {
                        x: {
                            type: 'time',
                            adapters: {
                                date: {
                                    locale: pl,
                                },
                            },
                            time: {
                                unit: 'month',
                                round: 'day',
                                displayFormats: {
                                    month: 'yyyy-MM'
                                }
                            },
                            title: {
                                display: true,
                                text: CHART_META[chartData.market][chartData.key].xLabel
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: CHART_META[chartData.market][chartData.key].yLabel
                            }
                        }
                    }
                }}
            />) : (<div className="error">
                Sorry, but we don't have this data yet :(
            </div>)}

        </div>
    );
}

export default StatisticsGraphComponent