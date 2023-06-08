import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import 'moment/locale/fr';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function LineChart({ habit, checkmarks }) {
  const checkDates = checkmarks.filter((checkmark) => checkmark.habitId === habit.id && habit.frequency.includes((moment(checkmark.date).day() + 6) % 7)).map((checkmark) => checkmark.date);

  const startDate = moment(habit.createdAt);

  const getDatesInRange = (startDate) => {
    const dates = [];

    const currentDate = moment();
    const days = currentDate.diff(startDate, 'days');
    if (days >= 0) {
      let current = moment(startDate);

      // 시작 날짜부터 오늘까지의 날짜를 계산하여 목록에 추가
      for (let i = 0; i <= days; i++) {
        dates.push(current.format('YYYY-MM-DD'));
        current = current.add(1, 'day');
      }
    }

    return dates;
  };

  const dateRange = getDatesInRange(startDate);
  const isDateIncluded = dateRange.map((date) => checkDates.includes(date));

  let result = 1;
  const multipliedData = isDateIncluded.map((value) => {
    if (value) {
      result *= 1.01;
    }
    return result;
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: { max: Math.ceil(Math.max(...multipliedData)) },
    },
  };

  const data = {
    labels: dateRange,
    datasets: [
      {
        label: 'Dataset 1',
        data: multipliedData,
        borderColor: 'rgb(1, 118, 214)',
        backgroundColor: 'rgba(1, 118, 214, 0.5)',
      },
    ],
  };

  return (
    <>
      <Line options={options} data={data} />
    </>
  );
}
