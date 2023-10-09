import React, {useState} from "react";

import {Line} from "react-chartjs-2";
import Chart from "chart.js/auto";
import {CategoryScale, LinearScale} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { pl } from 'date-fns/locale';


const SaleStatisticsComponent = ({saleStatistics}) => {
    Chart.register(CategoryScale, LinearScale);

    const [chartData, setChartData] = useState();



    if(saleStatistics == null){
        return;
    }

    return (
        <div className="sidebar-component__sale-statistics">
            <div className="sidebar-component__sale-statistics__title">
                Sale statistics
            </div>

            <Line
                data={{
                    labels: saleStatistics.map(entry => new Date(entry['entryDateYearMonth'] + "-01")),
                    datasets: [{
                        label: 'Sale prices',
                        data: saleStatistics.map(entry => entry['latestPrice']),
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
                            text: "Title"
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