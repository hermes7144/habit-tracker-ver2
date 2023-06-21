import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { HabitType } from '../types/types';
import useHabits from '../hooks/useHabits';

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

export default function BarChart({ week, labels }) {
  const { data: habits } = useHabits().habitsQuery;
  const { data: checkmarks } = useHabits().checksQuery;
  const filteredHabits = habits.filter((habit) => !habit.completed);

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

  const completionRateByDate = Object.keys(countByDate).map((date) => {
    const completedCount = completedByDate[date];
    const totalCount = countByDate[date];

    return totalCount ? Math.round((completedCount / totalCount) * 100) : 0;
  });

  const data = {
    labels,
    datasets: [{ data: completionRateByDate, backgroundColor: 'rgb(1, 118, 214)' }],
  };

  return <Bar options={options} data={data} plugins={[ChartDataLabels]} />;
}
