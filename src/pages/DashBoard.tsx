import React, { useState, Suspense } from 'react';

import moment from 'moment';
import 'moment/locale/fr';
import useHabits from '../hooks/useHabits';
import BarChart from '../components/BarChart';
import Achievements from '../components/Achievements';
import HabitsTable from '../components/HabitsTable';
import CalendarCard from '../components/CalendarCard';
import CardWrapper from '../components/CardWrapper';
import CardWrapperPlain from '../components/CardWrapperPlain';

export default function DashBoard() {
  const {
    habitsQuery: { data: habits },
    checksQuery: { data: checkmarks },
  } = useHabits();
  const filteredHabits = habits.filter((habit) => !habit.completed);
  const date = new Date();
  const [value, onChange] = useState<any>(date);
  const startOfWeek = moment(value).startOf('week');

  const week = Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'day').format('YYYY-MM-DD'));
  const labels = week.map((date) => moment(date).format('MM-DD'));

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className='mt-2'>
        <div className='flex flex-col lg:flex-row items-center lg:justify-between min-h-[272px] lg:h-full m-2 gap-4'>
          <CardWrapper>
            <BarChart week={week} labels={labels} />
          </CardWrapper>
          <CardWrapper>
            <Achievements />
          </CardWrapper>
          <CardWrapperPlain>
            <CalendarCard value={value} onChange={onChange} week={week} />
          </CardWrapperPlain>
        </div>
        <HabitsTable weeklyData={week} labels={labels} habits={filteredHabits} checkmarks={checkmarks} />
      </div>
    </Suspense>
  );
}
