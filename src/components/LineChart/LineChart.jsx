import React  from 'react';

import { Line } from 'react-chartjs-2';

import '../../assets/scss/chart.scss';

function LineChart({ eloArr, numsChart }) {
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

    return (
        <div className="chart">
            <Line data={data} options={{ maintainAspectRatio: false, animation: { duration: 0} }} />
        </div>
    )
}

export default LineChart;
