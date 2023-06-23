import React from 'react';
import '../Calendar.css';
import moment from 'moment';
import 'moment/locale/fr';
import { useLocation } from 'react-router-dom';
import LineChart from '../components/LineChart';
import DetailAchievement from '../components/DetailAchievement';
import { CheckType, HabitType } from '../types/types';
import CardWrapper from '../components/CardWrapper';
import HabitSetting from '../components/HabitSetting';
import CalendarCard from '../components/CalendarCard';

const HABIT_SUCCESS_MULTIPLY = 1.01;
const HABIT_FAILURE_MULTIPLY = 0.99;

export default function DetailPage() {
  const location = useLocation();
  const { habit, checkmarks } = location.state as { habit: HabitType; checkmarks: CheckType[] };

  const checkDates = checkmarks.filter((checkmark) => checkmark.habitId === habit.id && habit.frequency.includes((moment(checkmark.date).day() + 6) % 7)).map((checkmark) => checkmark.date);
  const startDate = moment(habit.createdAt);

  const getDatesInRange = (startDate) => {
    const dates = [];
    const currentDate = moment();
    const days = currentDate.diff(startDate, 'days');

    if (days >= 0) {
      let current = moment(startDate);
      // 시작 날짜부터 오늘까지의 날짜를 계산하여 목록에 추가
      for (let i = 0; i <= days; i++) {
        dates.push(current.format('YYYY-MM-DD'));
        current.add(1, 'day');
      }
    }
    return dates;
  };

  const totalDates = getDatesInRange(startDate);
  const isDateIncluded = totalDates.map((date) => checkDates.includes(date));

  let consecutiveFailures = 0;
  let initValue = 1;
  const achievement = isDateIncluded.map((isChecked) => {
    if (isChecked) {
      consecutiveFailures = 0;
      return (initValue *= HABIT_SUCCESS_MULTIPLY);
    } else {
      consecutiveFailures++;
      return (initValue *= consecutiveFailures > 1 ? HABIT_FAILURE_MULTIPLY : 1);
    }
  });

  const tileDisabled = () => true;
  const tileClassName = ({ date }) => (checkDates.find((val) => val === moment(date).format('YYYY-MM-DD')) ? 'highlight' : '');

  return (
    <div className='mt-2'>
      <div className='flex flex-col lg:flex-row items-center lg:justify-between m-2 gap-4'>
        <CardWrapper>
          <HabitSetting habit={habit} startDate={startDate} />
        </CardWrapper>
        <CardWrapper>
          <DetailAchievement habit={habit} totalDates={totalDates} checkDates={checkDates} />
        </CardWrapper>
        <CardWrapper plain>
          <CalendarCard tileDisabled={tileDisabled} tileClassName={tileClassName} />
        </CardWrapper>
      </div>
      <div className='flex justify-center max-w-screen-2xl h-auto lg:h-[500px] shadow-lg rounded mx-2'>
        <LineChart labels={totalDates} data={achievement} />
      </div>
    </div>
  );
}
