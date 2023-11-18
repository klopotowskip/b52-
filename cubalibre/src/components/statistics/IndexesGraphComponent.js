import React, {useState} from "react";

import {Line} from "react-chartjs-2";
import Chart from "chart.js/auto";
import {CategoryScale, LinearScale} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { pl } from 'date-fns/locale';

const PP = "ppValue";
const YIELD = "yieldValue";

const ENTRY_DATE_KEY = "entryDateYearMonth";

const MARKET_SALE = "sale";
const MARKET_RENTAL = "rental";

const CHART_META = {
    [PP] : {
        "title": "Payback Period (in years)",
        "xLabel": "Month-Year",
        "yLabel": "Years"
    },
    [YIELD] : {
        "title": "Yield",
        "xLabel": "Month-Year",
        "yLabel": "1/Years"
    }
};

const IndexesGraphComponent = ({statistics}) => {
    Chart.register(CategoryScale, LinearScale);

    const [chartData, setChartData] = useState({
        financialIndex: PP,
    });

    const onPpClicked = () => {
        setChartData({
            financialIndex: PP
        });
    };

    const onYieldClicked = () => {
        setChartData({
            financialIndex: YIELD
        });
    };



    if(statistics.sale == null){
        return;
    }
    if(statistics[chartData.financialIndex] == null){
        return;
    }

    return (
        <div className="sidebar-component__indexes">
            <h4 className="sidebar-component__section-title">Financial indexes</h4>
            <hr className="sidebar-component__statistics__tabs_separator" />
            <span className="sidebar-component__statistics__tabs_title">Index</span>
            <ul className="tabs sidebar-component__statistics__tabs">
                <li className="tab col s3"><a href="#" onClick={onPpClicked} className={chartData.financialIndex === PP ? "active": ""}>Payback Period</a></li>
                <li className="tab col s3"><a href="#" onClick={onYieldClicked} className={chartData.financialIndex === YIELD ? "active": ""}>Yield</a></li>
            </ul>

            {statistics[MARKET_RENTAL].length !== 0 && statistics[MARKET_SALE] !== 0 ? (<Line
                data={{
                    labels: statistics[chartData.financialIndex].map(entry => new Date(entry[ENTRY_DATE_KEY] + "-01")),
                    datasets: [{
                        label: CHART_META[chartData.financialIndex].title,
                        data: statistics[chartData.financialIndex].map(entry => entry["value"]),
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
                            text: CHART_META[chartData.financialIndex].title
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
                                text: CHART_META[chartData.financialIndex].xLabel
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: CHART_META[chartData.financialIndex].yLabel
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

export default IndexesGraphComponent