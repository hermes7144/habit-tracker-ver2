import React from 'react';
import ChartWrapper from './ChartWrapper';
import moment from 'moment';
import 'moment/locale/fr';

export default function DetailAchievement({ habit, checkDates, totalDates }) {
  const startOfWeek = moment().startOf('week');
  const beforeWeek = moment().subtract(1, 'w').startOf('week');
  const startOfMonth = moment().startOf('month');

  const achievement = Math.round((checkDates.length / totalDates.length) * 10000) / 100;

  const lastWeekDates = Array.from({ length: 7 }, (_, i) => beforeWeek.clone().add(i, 'day').format('YYYY-MM-DD'));
  const weeklyDates = Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'day').format('YYYY-MM-DD'));
  const monthlyDates = Array.from({ length: moment().daysInMonth() }, (_, i) => startOfMonth.clone().add(i, 'day').format('YYYY-MM-DD'));

  const lastWeekHabitFilter = lastWeekDates.filter((date) => moment(date).isSameOrAfter(habit.createdAt, 'day')).filter((date) => habit.frequency.includes((moment(date).day() + 6) % 7)).length;
  const weeklyHabitFilter = weeklyDates.filter((date) => moment(date).isSameOrAfter(habit.createdAt, 'day')).filter((date) => habit.frequency.includes((moment(date).day() + 6) % 7)).length;
  const monthlyHabitDays = monthlyDates.filter((date) => moment(date).isSameOrAfter(habit.createdAt, 'day')).filter((date) => habit.frequency.includes((moment(date).day() + 6) % 7)).length;

  const lastWeekAchieved = checkDates.filter((date) => lastWeekDates.includes(date)).length;
  const weeklyAchieved = checkDates.filter((date) => weeklyDates.includes(date)).length;
  const thisMonthAchieved = checkDates.filter((date) => monthlyDates.includes(date)).length;

  const lastWeekObj = { title: 'Last week', completed: Math.round((lastWeekAchieved / lastWeekHabitFilter) * 100) || 0 };
  const thisWeekObj = { title: 'This week', completed: Math.round((weeklyAchieved / weeklyHabitFilter) * 100) || 0 };
  const thisMonthObj = { title: 'This Month', completed: Math.round((thisMonthAchieved / monthlyHabitDays) * 100) || 0 };

  return (
    <div className='flex flex-col'>
      <div className='text-xl text-brand text-center font-bold'>Your performance</div>
      <div className='flex justify-center'>
        <ChartWrapper chartObj={lastWeekObj} />
        <ChartWrapper chartObj={thisWeekObj} />
        <ChartWrapper chartObj={thisMonthObj} />
      </div>
      <hr />
      <div className='flex justify-center items-center py-3'>
        <span className='text-gray-400'>Overall All Time Performance: {achievement}%</span>
      </div>
    </div>
  );
}
