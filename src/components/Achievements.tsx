import React from 'react';
import ChartWrapper from './ChartWrapper';
import moment from 'moment';
import 'moment/locale/fr';
import useHabits from '../hooks/useHabits';

export default function Achievements() {
  const { data: habits } = useHabits().habitsQuery;
  const { data: checkmarks } = useHabits().checksQuery;

  const date = new Date();
  const today = moment(date).format('YYYY-MM-DD');
  const dateIndex = (moment(date).day() + 6) % 7;

  const startOfWeek = moment(today).startOf('week');
  const beforeWeek = moment(today).subtract(1, 'w').startOf('week');

  const weeklyData = Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'day').format('YYYY-MM-DD'));
  const lastWeekData = Array.from({ length: 7 }, (_, i) => beforeWeek.clone().add(i, 'day').format('YYYY-MM-DD'));

  const totalHabits = habits.reduce((acc, habit) => acc + habit.frequency.length, 0);
  const todayTotalHabits = habits.filter((habit) => habit.frequency.includes(dateIndex)).length;

  const lastWeekAchieved = checkmarks.filter((checkmark) => lastWeekData.includes(checkmark.date)).length;
  const weeklyAchieved = checkmarks.filter((checkmark) => weeklyData.includes(checkmark.date)).length;
  const todayAchieved = checkmarks.filter((checkmark) => checkmark.date.includes(today)).length;

  const thisWeekObj = { title: 'this week', completed: Math.round((weeklyAchieved / totalHabits) * 100) || 0 };
  const lastWeekObj = { title: 'last week', completed: Math.round((lastWeekAchieved / totalHabits) * 100) || 0 };
  const todayObj = { title: 'today', completed: Math.round((todayAchieved / todayTotalHabits) * 100) || 0 };

  return (
    <div className='flex flex-col'>
      <div className='text-xl text-brand text-center font-bold'>Your performance</div>
      <div className='flex justify-center'>
        <ChartWrapper chartObj={lastWeekObj} />
        <ChartWrapper chartObj={thisWeekObj} />
        <ChartWrapper chartObj={todayObj} />
      </div>
      <hr />
      <div className='flex justify-center items-center py-3'>{/* <span className='text-gray-400'>Overall All Time Performance: {64}%</span> */}</div>
    </div>
  );
}
