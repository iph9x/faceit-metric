import React  from 'react';

import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types'; 

import useWindowSize from "../../assets/js/useWindowSize";
import '../../assets/scss/chart.scss';

function LineChart({ eloArr, KDArr, numsChart, fragsArr }) {
  const { width } = useWindowSize();

  const calcedFontSize = (width <= 1024) ? (width * 0.01171875) : 12;
  const pointSize = (width <= 1024) ? 2 : 3;

  const data = {
    labels: numsChart,
    datasets: [
      {
        lineTension: 0.2, 
        backgroundColor: [
            'transparent'
        ],
        borderColor: [
            '#2666c7'
        ],
        borderWidth: 3,
        pointBackgroundColor: '#2666c7',
        pointBorderColor: 'rgba(255, 255, 255, 0.4)',
        pointBorderWidth: 1,
        pointRadius: pointSize,
      }
    ]
  }

  let dataElo = JSON.parse(JSON.stringify(data));
  dataElo.datasets[0].data = eloArr;    
  dataElo.datasets[0].backgroundColor = '#2666c71a';

  let dataKD = JSON.parse(JSON.stringify(data));
  dataKD.datasets[0].data = KDArr;
  
  let dataFrags = JSON.parse(JSON.stringify(data));
  dataFrags.datasets[0].data = fragsArr;

  const options = {
    maintainAspectRatio: false,
    animation: { 
      duration: 0,
    },
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        ticks: {
          fontSize: calcedFontSize,
          fontColor: 'rgb(145, 145, 145)'
        }
      }],
      yAxes: [{
        ticks: {
          fontSize: calcedFontSize,
          fontColor: 'rgb(145, 145, 145)'
        }
      }],
    }
  };

  return (
    <div className="charts-box">
      <div className="chart-wrapper">
        <div className="chart-title">
          Elo progress
        </div>
        <div className="chart">
          <Line data={dataElo} options={options} />
        </div>
      </div>
      <div className="chart-wrapper">
        <div className="chart-title">
          K/D
        </div>
        <div className="chart">
          <Line data={dataKD} options={options} />
        </div>
      </div>
      <div className="chart-wrapper">
        <div className="chart-title">
          Frags
        </div>
        <div className="chart">
          <Line data={dataFrags} options={options} />
        </div>
      </div>
    </div>
  );
}

LineChart.propTypes = {
  eloArr: PropTypes.array, 
  KDArr: PropTypes.array, 
  fragsArr: PropTypes.array, 
  numsChart: PropTypes.array,
}

export default LineChart;
