import React from 'react';
import ChartWrapper from './ChartWrapper';
import moment from 'moment';
import 'moment/locale/fr';
import useHabits from '../hooks/useHabits';

export default function Achievements() {
  const { data: habits } = useHabits().habitsQuery;
  const { data: checkmarks } = useHabits().checksQuery;

  const filteredHabits = habits?.filter((habit) => !habit.completed);

  const today = moment().format('YYYY-MM-DD');
  const dayOfWeek = (moment().day() + 6) % 7;

  const startOfWeek = moment().startOf('week');
  const beforeWeek = moment().subtract(1, 'w').startOf('week');

  const lastWeekDates = Array.from({ length: 7 }, (_, i) => beforeWeek.clone().add(i, 'day').format('YYYY-MM-DD'));
  const weeklyDates = Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'day').format('YYYY-MM-DD'));

  const todayTotalHabits = filteredHabits.filter((habit) => habit.frequency.includes(dayOfWeek)).length;

  const lastWeekHabit = filteredHabits.flatMap((habit) =>
    lastWeekDates.filter((date) => {
      const habitCreatedAt = moment(habit.createdAt);
      const currentDate = moment(date);
      const isDateAfterHabitCreatedAt = currentDate.isSameOrAfter(habitCreatedAt, 'day');
      const isDayInFrequency = habit.frequency.includes((currentDate.day() + 6) % 7);
      return isDateAfterHabitCreatedAt && isDayInFrequency;
    })
  );

  const weeklyHabitFilter = filteredHabits.flatMap((habit) =>
    weeklyDates.filter((date) => {
      const habitCreatedAt = moment(habit.createdAt);
      const currentDate = moment(date);
      const isDateAfterHabitCreatedAt = currentDate.isSameOrAfter(habitCreatedAt, 'day');
      const isDayInFrequency = habit.frequency.includes((currentDate.day() + 6) % 7);
      return isDateAfterHabitCreatedAt && isDayInFrequency;
    })
  );

  const lastWeekAchieved = checkmarks.filter((checkmark) => lastWeekDates.includes(checkmark.date)).length;
  const weeklyAchieved = checkmarks.filter((checkmark) => weeklyDates.includes(checkmark.date)).length;
  const todayAchieved = checkmarks.filter((checkmark) => checkmark.date.includes(today)).length;

  const lastWeekObj = { title: 'last week', completed: ((lastWeekAchieved / lastWeekHabit.length) * 100).toFixed(1) || 0 };
  const thisWeekObj = { title: 'this week', completed: ((weeklyAchieved / weeklyHabitFilter.length) * 100).toFixed(1) || 0 };
  const todayObj = { title: 'today', completed: ((todayAchieved / todayTotalHabits) * 100).toFixed(1) || 0 };

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
