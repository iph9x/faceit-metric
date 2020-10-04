import React  from 'react';

import { Line } from 'react-chartjs-2';

import useWindowSize from "../../assets/js/useWindowSize"
import '../../assets/scss/chart.scss';

function LineChart({ eloArr, numsChart }) {
    const { width } = useWindowSize();

    const calcedFontSize = width <= 1024 ? width * 0.01171875 : 12;

    const data = {
        labels: numsChart,
        datasets: [
            {
                label: 'elo',
                data: eloArr,
                backgroundColor: [
                    '#2666c75e'
                ],
                borderColor: [
                    '#2666c7'
                ],
                borderWidth: 4,
                pointBackgroundColor: '#fff',
                pointBorderColor: 'rgba(60, 161, 219, 0.5)',
                pointBorderWidth: 1,
            }
        ]
    }

    const options = {
        maintainAspectRatio: false,
        animation: { duration: 0 },
        legend: {
            labels: {
                defaultFontSize: calcedFontSize,
            }
        },
        scales: {
            xAxes: [{
                ticks: {
                    fontSize: calcedFontSize,
                }
            }],
            yAxes: [{
                ticks: {
                    fontSize: calcedFontSize,
                }
            }],
        }
    };

    return (
        <div className="chart">
            <Line data={data} options={options} />
        </div>
    )
}

export default LineChart;
