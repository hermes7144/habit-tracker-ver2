import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'moment/locale/fr';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function LineChart({ labels, data }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: { max: Math.ceil(Math.max(...data)) },
    },
  };

  const datas = {
    labels,
    datasets: [
      {
        data,
        borderColor: 'rgb(1, 118, 214)',
        backgroundColor: 'rgba(1, 118, 214, 0.5)',
      },
    ],
  };

  return <Line options={options} data={datas} />;
}
