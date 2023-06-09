import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Plugin } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'moment/locale/fr';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function LineChart({ labels, data }) {
  const options = {
    plugins: {
      title: {
        display: true,
        text: `당신의 습관은 처음보다 ${Math.round(data[data.length - 1] * 100) / 100}배 더 나아졌습니다.`,
        padding: {
          top: 50,
          // bottom: 30,
        },
        size: 20,
      },
      legend: {
        display: false,
      },
    },
    responsive: true,
    scales: {
      x: { grid: { display: false } },
      y: { grid: { display: false }, max: Math.ceil(Math.max(...data, 2.1)), display: false },
    },
  };

  const datas = {
    labels: ['Start', '', '', ''],
    datasets: [
      {
        data: [1, data[Math.floor(data.length / 3)], data[data.length - 1]],
        borderColor: 'rgb(1, 118, 214)',
        backgroundColor: 'rgb(1, 118, 214)',
        pointRadius: 3, // Set pointRadius to 0 to hide the data points
        tension: 0.3,
      },
      {
        data: [2, 2, 2, 2],
        borderColor: 'rgba(255,0,0,0.3)',
        backgroundColor: 'rgba(255,0,0,0.3)',

        pointRadius: 0, // Set pointRadius to 0 to hide the data points
      },
    ],
  };

  const plugins: any = {
    id: 'customLegend',
    afterDraw: (chart, args, pluginOptions) => {
      const {
        ctx,
        chartArea: { left, right, top, bottom, width, height },
        scales: { x, y },
      } = chart;
      ctx.font = 'bolder 15px sans-serif';
      ctx.fillStyle = '#e5a0a0';
      ctx.fillText('최소 습관형성 횟수', left, chart.getDatasetMeta(1).data[0].y - 15);
    },
  };

  return <Line data={datas} plugins={[plugins]} options={options} />;
}
