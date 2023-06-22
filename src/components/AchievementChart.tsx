import DoughnutChart from './DoughnutChart';

export default function AchievementChart({ chartObj }) {
  return (
    <div className='flex flex-col items-center w-4/12'>
      <span className='text-xl py-3 text-gray-400'>{chartObj.completed}%</span>
      <div className='max-w-[90px]'>
        <DoughnutChart chartObj={chartObj} />
      </div>
      <span className='text-gray-400'>{chartObj.title}</span>
    </div>
  );
}
