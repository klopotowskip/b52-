import React, {useState} from "react";

import {Line} from "react-chartjs-2";
import Chart from "chart.js/auto";
import {CategoryScale, LinearScale} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { pl } from 'date-fns/locale';


const SaleStatisticsComponent = ({saleStatistics}) => {
    Chart.register(CategoryScale, LinearScale);

    const [chartData, setChartData] = useState({
        market: "primary",
        key: "latestPrice",
        title: "Average price [PLN]"
    });

    const onPriceClicked = () => {
        setChartData({
            market: chartData["market"],
            key: "latestPrice",
            title: "Average price [PLN]"
        });
    };

    const onPricePerSquareMeterClicked = () => {
        setChartData({
            market: chartData["market"],
            key: "latestPricePerSquareMeter",
            title: "Average price per m^2 [PLN/m^2]"
        });
    };

    const onSizeClicked = () => {
        setChartData({
            market: chartData["market"],
            key: "sizeSquareMeters",
            title: "Average size in m^2"
        });
    };



    if(saleStatistics == null){
        return;
    }

    return (
        <div className="sidebar-component__statistics">

            <ul className="tabs sidebar-component__statistics__tabs">
                <li className="tab col s3"><a href="#" onClick={onPriceClicked}>Price</a></li>
                <li className="tab col s3"><a href="#" onClick={onPricePerSquareMeterClicked}>Price/m<sup>2</sup></a></li>
                <li className="tab col s3"><a href="#" onClick={onSizeClicked}>Size</a></li>
            </ul>

            <Line
                data={{
                    labels: saleStatistics.map(entry => new Date(entry['entryDateYearMonth'] + "-01")),
                    datasets: [{
                        label: 'Sale prices',
                        data: saleStatistics.map(entry => entry[chartData['key']]),
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
                            text: chartData['title']
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

export default SaleStatisticsComponent