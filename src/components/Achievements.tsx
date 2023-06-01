import ChartWrapper from './ChartWrapper';
import moment from 'moment';
import 'moment/locale/fr';
import useHabits from '../hooks/useHabits';

export default function Achievements() {
  const {
    habitsQuery: { data: habits },
    checksQuery: { data: checkmarks },
  } = useHabits();

  const date = new Date();
  const today = moment(date).format('YYYY-MM-DD');
  const dateIndex = (moment(date).day() + 6) % 7;

  const startOfWeek = moment(today).startOf('week');
  const beforeWeek = moment(today).subtract(1, 'w').startOf('week');

  const weeklyData = Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'day').format('YYYY-MM-DD'));
  const laskWeekData = Array.from({ length: 7 }, (_, i) => beforeWeek.clone().add(i, 'day').format('YYYY-MM-DD'));

  const totalHabits = habits.reduce((acc, habit) => acc + habit.frequency.length, 0);

  const weeklyAchieved = checkmarks.filter((checkmark) => weeklyData.includes(checkmark.date)).length;
  const lastWeekAchieved = checkmarks.filter((checkmark) => laskWeekData.includes(checkmark.date)).length;
  const todayTotalAchieved = habits.filter((habit) => habit.frequency.includes(dateIndex)).length;
  const todayAchieved = checkmarks?.filter((checkmark) => checkmark.date.includes(today)).length;

  console.log(todayTotalAchieved, todayAchieved);

  const weekPct = { title: 'this week', pct: Math.round((weeklyAchieved / totalHabits) * 100) || 0 };
  const lastweekPct = { title: 'last week', pct: Math.round((lastWeekAchieved / totalHabits) * 100) || 0 };
  const todayPct = { title: 'today', pct: Math.round((todayAchieved / todayTotalAchieved) * 100) || 0 };

  return (
    <div className='flex flex-col'>
      <div className='text-xl text-brand text-center'>Your performance</div>
      <div className='flex justify-center'>
        <ChartWrapper pct={lastweekPct} />
        <ChartWrapper pct={weekPct} />
        <ChartWrapper pct={todayPct} />
      </div>
      <hr />
      <div className='flex justify-center items-center py-3'>{/* <span className='text-gray-400'>Overall All Time Performance: {64}%</span> */}</div>
    </div>
  );
}
