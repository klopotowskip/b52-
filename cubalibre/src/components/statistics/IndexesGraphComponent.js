import React, {useState} from "react";

import {Line} from "react-chartjs-2";
import Chart from "chart.js/auto";
import {CategoryScale, LinearScale} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { pl } from 'date-fns/locale';

import { Finance } from 'financejs'

const NPV = "npv";
const IRR = "irr";
const PAYBACK_PERIOD = "payback_period";

const MARKET_SALE = "sale";
const MARKET_RENTAL = "rental";

const NPV_TITLE = "Net Present Value (NPV) [i=15%]";
const IRR_TITLE = "Internal Rate of Return (IRR)";
const PAYBACK_PERIOD_TITLE = "Payback Period"


const IndexesGraphComponent = ({statistics}) => {
    Chart.register(CategoryScale, LinearScale);
    const finance = new Finance();

    const [chartData, setChartData] = useState({
        //commonStatistics: statistics['sale'].filter()
        financialIndex: NPV,
        graphTitle: NPV_TITLE
    });

    const onNpvClicked = () => {
        setChartData({
            financialIndex: NPV,
            graphTitle: NPV_TITLE
        });
    };

    const onIrrClicked = () => {
        setChartData({
            financialIndex: IRR,
            graphTitle: IRR_TITLE
        });
    };

    const onPaybackPeriodClicked = () => {
        setChartData({
            financialIndex: PAYBACK_PERIOD,
            graphTitle: PAYBACK_PERIOD_TITLE
        });
    };

    const commonLabels = (saleData, rentalData) => {
        return saleData.map(entry => entry.entryDateYearMonth)
            .filter(ymDate => rentalData.map(rdEntry => rdEntry.entryDateYearMonth).includes(ymDate))
            .map(date => new Date(date + "-01"));
    }

    const paybackPeriod = (date, saleData, rentalData) => {
        const yyyyMm = date.format('YYYY-MM');
        const buyPrice = saleData.find(entry => entry.entryDateYearMonth === yyyyMm);
        const rentPrice = rentData.find(entry => entry.entryDateYearMonth === yyyyMm);
        return finance.PP(0, -buyPrice, rentPrice);
    }



    if(statistics.sale == null){
        return;
    }

    return (
        <div className="sidebar-component__indexes">
            <h4 className="sidebar-component__indexes__title">Financial indexes</h4>
            <ul className="tabs sidebar-component__statistics__tabs">
                <li className="tab col s3"><a href="#" onClick={onNpvClicked} className={chartData.financialIndex === NPV ? "active": ""}>NPV</a></li>
                <li className="tab col s3"><a href="#" onClick={onIrrClicked} className={chartData.financialIndex === IRR ? "active": ""}>IRR</a></li>
                <li className="tab col s3"><a href="#" onClick={onPaybackPeriodClicked} className={chartData.financialIndex === PAYBACK_PERIOD ? "active": ""}>RoR</a></li>
            </ul>

            {statistics[MARKET_RENTAL].length !== 0 && statistics[MARKET_SALE] !== 0 ? (<Line
                data={{
                    labels: commonLabels(statistics[MARKET_SALE], statistics[MARKET_RENTAL]),
                    datasets: [{
                        label: 'Sale prices',
                        data: [1, 2],
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
            />) : (<div className="error">
                Sorry, but we don't have this data yet :(
            </div>)}

        </div>
    );
}

export default IndexesGraphComponent