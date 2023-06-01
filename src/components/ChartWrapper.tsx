import DoughnutChart from './DoughnutChart';

export default function ChartWrapper({ pct }) {
  return (
    <div className='flex flex-col items-center w-1/3 px-2'>
      <span className='text-2xl p-3'>{pct * 100}%</span>
      <DoughnutChart pct={pct} />
      <span className=''>last week</span>
    </div>
  );
}
