import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  cutout: 30,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

export default function DoughnutChart({ chartObj }) {
  const data = {
    labels: ['Completed', 'Active'],
    datasets: [
      {
        data: [chartObj.completed, 100 - chartObj.completed], // 데이터 값 (예: 60%)
        backgroundColor: ['rgb(1, 118, 214)', '#eeeeee'], // 도넛 채우는 색상
        hoverBackgroundColor: ['rgb(1, 118, 214)', '#eeeeee'], // 마우스 오버 시 색상
        borderColor: ['rgb(1, 118, 214)', '#eeeeee'],
      },
    ],
  };

  return <Doughnut data={data} options={options} />;
}
