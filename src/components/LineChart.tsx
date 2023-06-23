import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
// Minimum Habit Rate
const MHR = 2;

export default function LineChart({ labels, data }) {
  const options = {
    plugins: {
      title: {
        display: true,
        text: `당신의 습관은 처음보다 ${data[data.length - 1].toFixed(2)}배 더 나아졌습니다.`,
        padding: { top: 50 },
        size: 20,
      },
      legend: { display: false },
    },
    responsive: true,
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          display: true,
          autoSkip: true,
          maxTicksLimit: 5,
        },
      },
      y: { grid: { display: false }, max: Math.ceil(Math.max(...data, 2.1)), display: false },
    },
  };

  const skipped = (ctx, value) => {
    return ctx.p1DataIndex === data.length ? value : undefined;
  };

  const achievedDatas = {
    labels,
    datasets: [
      {
        data,
        borderColor: 'rgb(1, 118, 214)',
        pointRadius: 0,
        tension: 0.3,
      },
      {
        data: Array(data.length).fill(MHR),
        borderColor: 'rgba(255,0,0,0.3)',
        pointRadius: 0,
      },
    ],
  };

  const unAchieveddatas = {
    labels: [...labels, ''],
    datasets: [
      {
        data: [...data, MHR],
        borderColor: 'rgb(1, 118, 214)',
        pointRadius: 0,
        tension: 0.3,

        segment: {
          borderColor: (ctx) => skipped(ctx, 'rgba(0,0,0,0.2)'),
          borderDash: (ctx) => skipped(ctx, [6, 6]),
        },
        spanGaps: true,
      },
      {
        data: Array(data.length + 1).fill(MHR),
        borderColor: 'rgba(255,0,0,0.3)',
        pointRadius: 0,
      },
    ],
  };

  const isDataAchieved = data[data.length - 1] > MHR;
  const datas = isDataAchieved ? achievedDatas : unAchieveddatas;

  const plugins: any = {
    id: 'customLegend',
    afterDraw: (chart) => {
      const {
        ctx,
        chartArea: { left },
      } = chart;
      ctx.font = 'bolder 15px sans-serif';
      ctx.fillStyle = '#e5a0a0';
      ctx.fillText('최소 습관형성 횟수', left, chart.getDatasetMeta(1).data[0].y - 15);
    },
  };

  return <Line data={datas} plugins={[plugins]} options={options} />;
}
