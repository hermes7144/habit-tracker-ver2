import React from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import AchievementChart from './AchievementChart';

export default function DetailAchievement({ habit, totalDates, checkDates }) {
  const lastWeekHabitFilter = getHabitFilter(lastWeekDates, habit.createdAt, habit.frequency);
  const weeklyHabitFilter = getHabitFilter(thisWeekDates, habit.createdAt, habit.frequency);
  const monthlyHabitDays = getHabitFilter(monthlyDates, habit.createdAt, habit.frequency);

  const lastWeekAchieved = getAchievedCount(lastWeekDates, checkDates);
  const weeklyAchieved = getAchievedCount(thisWeekDates, checkDates);
  const thisMonthAchieved = getAchievedCount(monthlyDates, checkDates);

  const achievement = ((checkDates.length / totalDates.length) * 100).toFixed(1);

  return (
    <div className='flex flex-col'>
      <div className='text-xl text-brand text-center font-bold'>Your performance</div>
      <div className='flex justify-center'>
        <AchievementChart title='Last week' percentage={getCompletedPercentage(lastWeekAchieved, lastWeekHabitFilter)} />
        <AchievementChart title='This week' percentage={getCompletedPercentage(weeklyAchieved, weeklyHabitFilter)} />
        <AchievementChart title='This Month' percentage={getCompletedPercentage(thisMonthAchieved, monthlyHabitDays)} />
      </div>
      <hr />
      <div className='flex justify-center items-center py-3'>
        <span className='text-gray-400'>Overall All Time Performance: {achievement}%</span>
      </div>
    </div>
  );
}

const getHabitFilter = (dates, createdAt, frequency) => dates.filter((date) => moment(date).isSameOrAfter(createdAt, 'day')).filter((date) => frequency.includes((moment(date).day() + 6) % 7)).length;
const getAchievedCount = (dates, checkDates) => checkDates.filter((date) => dates.includes(date)).length;
const getCompletedPercentage = (achieved, habitFilter) => {
  const percentage = (achieved / habitFilter) * 100;
  return Number.isFinite(percentage) ? percentage.toFixed(1) : 0;
};

const today = new Date();

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getStartOfWeek = (date) => {
  const startOfWeek = new Date(date);
  const diff = (date.getDay() - 1 + 7) % 7;
  startOfWeek.setDate(date.getDate() - diff);
  return startOfWeek;
};

const getWeekDates = (date) => {
  const weekDates = [];
  const currentDate = new Date(date);

  // 첫째 요일까지 이동
  currentDate.setDate(currentDate.getDate() - ((currentDate.getDay() + 6) % 7));

  // 첫째 요일부터 마지막 요일까지의 날짜를 배열에 추가
  for (let i = 0; i < 7; i++) {
    weekDates.push(formatDate(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekDates;
};
const getMonthDates = (date) => {
  const monthDates = [];
  const currentDate = new Date(date.getFullYear(), date.getMonth(), 1);

  // 해당 월의 첫째 날부터 마지막 날까지의 날짜를 배열에 추가
  while (currentDate.getMonth() === date.getMonth()) {
    monthDates.push(formatDate(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return monthDates;
};

const startOfWeek = getStartOfWeek(today);

const thisWeekDates = getWeekDates(startOfWeek);
const lastWeekDates = getWeekDates(new Date(startOfWeek.getTime() - 7 * 24 * 60 * 60 * 1000));

const startOfMonth = new Date();
startOfMonth.setDate(1);
const monthlyDates = getMonthDates(startOfMonth);
