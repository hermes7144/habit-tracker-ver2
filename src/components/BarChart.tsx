import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { HabitType } from '../types/types';
import moment from 'moment';
import 'moment/locale/fr';
import { useHabitHooks } from '../context/HabitContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  scales: {
    x: { grid: { display: false } },
    y: { grid: { display: false }, max: 110, display: false },
  },
  plugins: {
    datalabels: { color: 'white', font: { size: 12, weight: 800 } },
    legend: { display: false },
  },
};

export default function BarChart({ week }) {
  const { useHabits } = useHabitHooks();
  const { data: habits } = useHabits().habitsQuery;
  const { data: checkmarks } = useHabits().checksQuery;

  const filteredHabits = habits.filter((habit) => !habit.completed);
  const labels = week.map((date) => moment(date).format('MM-DD'));

  const totalDate = filteredHabits.flatMap((habit: HabitType) => habit.frequency.map((freq) => week[freq]));

  const countByDate = {};
  const completedByDate = {};

  week.forEach((date) => {
    countByDate[date] = 0;
    completedByDate[date] = 0;
  });

  totalDate.forEach((date) => {
    countByDate[date]++;
  });

  checkmarks.forEach((checkmark) => {
    completedByDate[checkmark.date]++;
  });

  const chartData = Object.keys(countByDate).map((date) => {
    const totalCount = countByDate[date];
    const completedCount = completedByDate[date];

    return totalCount ? ((completedCount / totalCount) * 100).toFixed(1) : 0;
  });

  const data = {
    labels,
    datasets: [{ data: chartData, backgroundColor: 'rgb(1, 118, 214)' }],
  };

  return <Bar options={options} data={data} plugins={[ChartDataLabels]} />;
}
