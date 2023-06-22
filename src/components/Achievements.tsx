import React from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import { useHabitHooks } from '../context/HabitContext';

import AchievementChart from './AchievementChart';

export default function Achievements() {
  const { useHabits } = useHabitHooks();
  const { data: habits } = useHabits().habitsQuery;
  const { data: checkmarks } = useHabits().checksQuery;

  const today = moment();
  const dayOfWeek = (moment().day() + 6) % 7;
  const startOfWeek = moment().startOf('week');
  const beforeWeek = moment().subtract(1, 'w').startOf('week');

  const lastWeekDates = Array.from({ length: 7 }, (_, i) => beforeWeek.clone().add(i, 'day').format('YYYY-MM-DD'));
  const weeklyDates = Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'day').format('YYYY-MM-DD'));

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
  const weekHabitCount = filteredHabits.flatMap((habit) => countHabitCompleted(habit, weeklyDates)).length;

  const getAchievedCount = (checkmarks, dates) => checkmarks.filter((checkmark) => dates.includes(checkmark.date)).length;

  const lastWeekAchievedCount = getAchievedCount(checkmarks, lastWeekDates);
  const weeklyAchievedCount = getAchievedCount(checkmarks, weeklyDates);
  const todayAchievedCount = getAchievedCount(checkmarks, [today.format('YYYY-MM-DD')]);

  const calculateCompletionRate = (achieved, total) => {
    const completionRate = (achieved / total) * 100;
    if (Number.isFinite(completionRate)) {
      return completionRate.toFixed(1);
    } else {
      return 0;
    }
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
