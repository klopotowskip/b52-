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


const StatisticsGraphComponent = ({statistics}) => {
    Chart.register(CategoryScale, LinearScale);

    const [chartData, setChartData] = useState({
        market: MARKET_SALE,
        key: PRICE,
        graphTitle: "Average price [PLN]"
    });

    const onSaleClicked = () => {
        setChartData({
            market: MARKET_SALE,
            key: chartData.key,
            title: chartData.graphTitle
        });
    }

    const onRentalClicked = () => {
        setChartData({
            market: MARKET_RENTAL,
            key: chartData.key,
            title: chartData.graphTitle
        });
    }

    const onPriceClicked = () => {
        setChartData({
            market: chartData.market,
            key: PRICE,
            title: "Average price [PLN]"
        });
    };

    const onPricePerSquareMeterClicked = () => {
        setChartData({
            market: chartData.market,
            key: PRICE_PER_SQ_M,
            title: "Average price per m^2 [PLN/m^2]"
        });
    };

    const onSizeClicked = () => {
        setChartData({
            market: chartData.market,
            key: SIZE,
            title: "Average size in m^2"
        });
    };



    if(statistics.sale == null){
        return;
    }

    return (
        <div className="sidebar-component__statistics">

            <ul className="tabs sidebar-component__statistics__tabs">
                <li className="tab col s3"><a href="#" onClick={onSaleClicked} className={chartData.market === MARKET_SALE ? "active": ""}>Sale</a></li>
                <li className="tab col s3"><a href="#" onClick={onRentalClicked} className={chartData.market === MARKET_RENTAL ? "active": ""}>Rental</a></li>
            </ul>

            <ul className="tabs sidebar-component__statistics__tabs">
                <li className="tab col s3">
                    <a href="#" onClick={onPriceClicked} className={chartData.key === PRICE ? "active": ""}>Price</a>
                </li>
                <li className="tab col s3">
                    <a href="#" onClick={onPricePerSquareMeterClicked} className={chartData.key === PRICE_PER_SQ_M ? "active": ""}>Price/m<sup>2</sup></a>
                </li>
                <li className="tab col s3">
                    <a href="#" onClick={onSizeClicked} className={chartData.key === SIZE ? "active": ""}>Size</a>
                </li>
            </ul>

            <Line
                data={{
                    labels: statistics[chartData.market].map(entry => new Date(entry['entryDateYearMonth'] + "-01")),
                    datasets: [{
                        label: 'Sale prices',
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
                            text: chartData.graphTitle
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
                                displayFormats: {
                                    month: 'yyyy-MM'
                                }
                            },
                            title: {
                                display: true,
                                text: 'Date'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Value'
                            }
                        }
                    }
                }}
            />
        </div>
    );
}

export default StatisticsGraphComponent