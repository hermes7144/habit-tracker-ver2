import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({ pct }) {
  const data = {
    labels: ['Completed', 'Active'],
    datasets: [
      {
        data: [pct.pct, 100 - pct.pct], // 데이터 값 (예: 60%)
        backgroundColor: ['rgb(1, 118, 214)', '#eeeeee'], // 도넛 채우는 색상
        hoverBackgroundColor: ['rgb(1, 118, 214)', '#eeeeee'], // 마우스 오버 시 색상
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      datalabels: {
        color: 'white',
        formatter: function (value, context) {
          //데이터 값이 0 이면 출력 안함

          if (value === 0) {
            return null;
          } else {
            let result = value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

            return Math.round(Number(result * 10)) / 10;
          }
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return <Doughnut data={data} options={options} />;
}
