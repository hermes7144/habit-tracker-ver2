import React from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import { useHabitsHooks } from '../context/HabitsContext';

import AchievementChart from './AchievementChart';

export default function Achievements() {
  const { useHabits } = useHabitsHooks();
  const { data: habits } = useHabits().habitsQuery;
  const { data: checkmarks } = useHabits().checksQuery;

  const today = new Date();
  const dayOfWeek = (today.getDay() + 6) % 7;

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

  const startOfWeek = getStartOfWeek(today);

  const thisWeekDates = getWeekDates(startOfWeek);
  const lastWeekDates = getWeekDates(new Date(startOfWeek.getTime() - 7 * 24 * 60 * 60 * 1000));

  const filteredHabits = habits.filter((habit) => !habit.completed);
  const todayHabitsCount = filteredHabits.filter((habit) => habit.frequency.includes(dayOfWeek)).length;

  const isHabitCompleted = (habit, date) => {
    const habitCreatedAt = moment(habit.createdAt);
    const currentDate = moment(date);
    const isDateAfterHabitCreatedAt = currentDate.isSameOrAfter(habitCreatedAt, 'day');
    const isDayInFrequency = habit.frequency.includes(currentDate.day());
    return isDateAfterHabitCreatedAt && isDayInFrequency;
  };

  const countHabitCompleted = (habit, dates) => dates.filter((date) => isHabitCompleted(habit, date));

  const lastWeekHabitCount = filteredHabits.flatMap((habit) => countHabitCompleted(habit, lastWeekDates)).length;
  const weekHabitCount = filteredHabits.flatMap((habit) => countHabitCompleted(habit, thisWeekDates)).length;

  const getAchievedCount = (checkmarks, dates) => dates.reduce((count, date) => count + checkmarks.filter((checkmark) => checkmark.date === date).length, 0);

  const lastWeekAchievedCount = getAchievedCount(checkmarks, lastWeekDates);
  const weeklyAchievedCount = getAchievedCount(checkmarks, thisWeekDates);
  const todayAchievedCount = getAchievedCount(checkmarks, [formatDate(today)]);

  const calculateCompletionRate = (achieved, total) => {
    const completionRate = (achieved / total) * 100;
    return Number.isFinite(completionRate) ? completionRate.toFixed(1) : 0.0;
  };

  const lastWeekObj = { title: 'last week', completed: calculateCompletionRate(lastWeekAchievedCount, lastWeekHabitCount) };
  const thisWeekObj = { title: 'this week', completed: calculateCompletionRate(weeklyAchievedCount, weekHabitCount) };
  const todayObj = { title: 'today', completed: calculateCompletionRate(todayAchievedCount, todayHabitsCount) };

  return (
    <div className='flex flex-col'>
      <div className='text-xl text-brand text-center font-bold my-5'>Your performance</div>
      <div className='flex justify-center'>
        <AchievementChart chartObj={lastWeekObj} />
        <AchievementChart chartObj={thisWeekObj} />
        <AchievementChart chartObj={todayObj} />
      </div>
    </div>
  );
}
