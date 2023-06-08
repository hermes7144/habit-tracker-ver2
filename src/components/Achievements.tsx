import React from 'react';
import ChartWrapper from './ChartWrapper';
import moment from 'moment';
import 'moment/locale/fr';
import useHabits from '../hooks/useHabits';

export default function Achievements() {
  const { data: habits } = useHabits().habitsQuery;
  const { data: checkmarks } = useHabits().checksQuery;

  const today = moment().format('YYYY-MM-DD');
  const dayOfWeek = (moment().day() + 6) % 7;

  const startOfWeek = moment().startOf('week');
  const beforeWeek = moment().subtract(1, 'w').startOf('week');

  const weeklyData = Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'day').format('YYYY-MM-DD'));
  const lastWeekData = Array.from({ length: 7 }, (_, i) => beforeWeek.clone().add(i, 'day').format('YYYY-MM-DD'));

  const totalHabits = habits.reduce((acc, habit) => acc + habit.frequency.length, 0);
  const todayTotalHabits = habits.filter((habit) => habit.frequency.includes(dayOfWeek)).length;

  const lastWeekAchieved = checkmarks.filter((checkmark) => lastWeekData.includes(checkmark.date)).length;
  const weeklyAchieved = checkmarks.filter((checkmark) => weeklyData.includes(checkmark.date)).length;
  const todayAchieved = checkmarks.filter((checkmark) => checkmark.date.includes(today)).length;

  const thisWeekObj = { title: 'this week', completed: Math.round((weeklyAchieved / totalHabits) * 100) || 0 };
  const lastWeekObj = { title: 'last week', completed: Math.round((lastWeekAchieved / totalHabits) * 100) || 0 };
  const todayObj = { title: 'today', completed: Math.round((todayAchieved / todayTotalHabits) * 100) || 0 };

  return (
    <div className='flex flex-col'>
      <div className='text-xl text-brand text-center font-bold my-5'>Your performance</div>
      <div className='flex justify-center'>
        <ChartWrapper chartObj={lastWeekObj} />
        <ChartWrapper chartObj={thisWeekObj} />
        <ChartWrapper chartObj={todayObj} />
      </div>
    </div>
  );
}
