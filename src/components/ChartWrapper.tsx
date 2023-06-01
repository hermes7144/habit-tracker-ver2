import DoughnutChart from './DoughnutChart';

export default function ChartWrapper({ pct }) {
  return (
    <div className='flex flex-col items-center w-4/12'>
      <span className='text-lg py-3 text-gray-400'>{pct.pct}%</span>
      <div className='max-w-[110px]'>
        <DoughnutChart pct={pct} />
      </div>
      <span className='text-gray-400'>{pct.title}</span>
    </div>
  );
}
