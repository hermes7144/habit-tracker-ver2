import ChartWrapper from './ChartWrapper';

export default function Achievements({ habits, checkmarks, weeklyData, laskWeekData, freq, today }) {
  const totalHabits = habits.reduce((acc, habit) => acc + habit.frequency.length, 0);

  const weeklyAchieved = checkmarks.filter((checkmark) => weeklyData.includes(checkmark.date)).length;
  const lastWeekAchieved = checkmarks.filter((checkmark) => laskWeekData.includes(checkmark.date)).length;

  const todayTotalAchieved = habits.reduce((acc, habit) => acc + Number(habit.frequency.includes(String(freq))), 0);

  const todayAchieved = checkmarks.filter((checkmark) => checkmark.date.includes(String(today))).length;

  const weekPct = { title: 'this week', pct: Math.round((weeklyAchieved / totalHabits) * 100) };
  const lastweekPct = { title: 'last week', pct: Math.round((lastWeekAchieved / totalHabits) * 100) };
  const todayPct = { title: 'today', pct: Math.round((todayAchieved / todayTotalAchieved) * 100) };

  return (
    <div className='flex flex-col'>
      <div className='text-xl text-brand text-center '>Your performance</div>
      <div className='flex '>
        <ChartWrapper pct={lastweekPct} />
        <ChartWrapper pct={weekPct} />
        <ChartWrapper pct={todayPct} />
      </div>
      <hr />
      <div className='flex justify-center items-center py-3'>
        <span className='text-gray-400'>Overall All Time Performance: {64}%</span>
      </div>
    </div>
  );
}
