import React from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import AchievementChart from './AchievementChart';

export default function DetailAchievement({ habit, totalDates, checkDates }) {
  const getDates = (start, length, unit) => Array.from({ length }, (_, i) => start.clone().add(i, unit).format('YYYY-MM-DD'));
  const getHabitFilter = (dates, createdAt, frequency) => dates.filter((date) => moment(date).isSameOrAfter(createdAt, 'day')).filter((date) => frequency.includes((moment(date).day() + 6) % 7)).length;
  const getAchievedCount = (dates, checkDates) => checkDates.filter((date) => dates.includes(date)).length;
  const getCompletedPercentage = (achieved, habitFilter) => {
    const percentage = (achieved / habitFilter) * 100;
    return Number.isFinite(percentage) ? percentage.toFixed(1) : 0;
  };
  const startOfWeek = moment().startOf('week');
  const beforeWeek = moment().subtract(1, 'w').startOf('week');
  const startOfMonth = moment().startOf('month');

  const achievement = ((checkDates.length / totalDates.length) * 100).toFixed(1);

  const lastWeekDates = getDates(beforeWeek, 7, 'day');
  const weeklyDates = getDates(startOfWeek, 7, 'day');
  const monthlyDates = getDates(startOfMonth, moment().daysInMonth(), 'day');

  const lastWeekHabitFilter = getHabitFilter(lastWeekDates, habit.createdAt, habit.frequency);
  const weeklyHabitFilter = getHabitFilter(weeklyDates, habit.createdAt, habit.frequency);
  const monthlyHabitDays = getHabitFilter(monthlyDates, habit.createdAt, habit.frequency);

  const lastWeekAchieved = getAchievedCount(lastWeekDates, checkDates);
  const weeklyAchieved = getAchievedCount(weeklyDates, checkDates);
  const thisMonthAchieved = getAchievedCount(monthlyDates, checkDates);

  const lastWeekObj = { title: 'Last week', completed: getCompletedPercentage(lastWeekAchieved, lastWeekHabitFilter) };
  const thisWeekObj = { title: 'This week', completed: getCompletedPercentage(weeklyAchieved, weeklyHabitFilter) };
  const thisMonthObj = { title: 'This Month', completed: getCompletedPercentage(thisMonthAchieved, monthlyHabitDays) };

  return (
    <div className='flex flex-col'>
      <div className='text-xl text-brand text-center font-bold'>Your performance</div>
      <div className='flex justify-center'>
        <AchievementChart chartObj={lastWeekObj} />
        <AchievementChart chartObj={thisWeekObj} />
        <AchievementChart chartObj={thisMonthObj} />
      </div>
      <hr />
      <div className='flex justify-center items-center py-3'>
        <span className='text-gray-400'>Overall All Time Performance: {achievement}%</span>
      </div>
    </div>
  );
}
