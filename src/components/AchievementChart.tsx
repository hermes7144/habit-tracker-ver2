import DoughnutChart from './DoughnutChart';

export default function AchievementChart({ title, percentage }) {
  return (
    <div className='flex flex-col items-center w-4/12'>
      <span className='text-xl py-3 text-gray-400'>{percentage}%</span>
      <div className='max-w-[90px]'>
        <DoughnutChart percentage={percentage} />
      </div>
      <span className='text-gray-400'>{title}</span>
    </div>
  );
}
