import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { HabitType } from '../pages/DashBoard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  scales: {
    x: { grid: { display: false } },
    y: { grid: { display: false }, max: 110, display: false },
  },
  plugins: {
    datalabels: {
      color: 'white',
      formatter: function (value, context) {
        //데이터 값이 0 이면 출력 안함

        if (value === 0) {
          return null;
        } else {
          let result = value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
          return Math.round(Number(result));
        }
      },
      font: {
        size: 12,
        weight: 800,
      },
    },
    legend: {
      display: false,
    },
  },
};

export default function BarChart({ dates, labels, habits, checkmarks }) {
  const totalDate = habits.flatMap((habit: HabitType) => habit.frequency.map((freq) => dates[freq]));

  const countByDate = {};
  const completedByDate = {};

  dates.forEach((date) => {
    countByDate[date] = 0;
    completedByDate[date] = 0;
  });

  totalDate.forEach((date) => {
    countByDate[date]++;
  });

  checkmarks.forEach((checkmark) => {
    completedByDate[checkmark.date]++;
  });

  const completionRateByDate = Object.keys(countByDate).map((date) => {
    const totalCount = countByDate[date];
    const completedCount = completedByDate[date];
    return totalCount === 0 ? 0 : (completedCount / totalCount) * 100;
  });

  const data = {
    labels,
    datasets: [
      {
        label: '',
        data: completionRateByDate,
        backgroundColor: 'rgb(1, 118, 214)',
        max: 110,
      },
    ],
  };

  return <Bar options={options} data={data} plugins={[ChartDataLabels]} />;
}
