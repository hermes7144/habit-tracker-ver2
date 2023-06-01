import DoughnutChart from './DoughnutChart';

export default function ChartWrapper({ pct }) {
  return (
    <div className='flex flex-col items-center w-1/3 px-2'>
      <span className='text-lg p-3 text-gray-400'>{pct.pct}%</span>
      <DoughnutChart pct={pct} />
      <span className='text-gray-400'>{pct.title}</span>
    </div>
  );
}
