import React, { useState, Suspense } from 'react';

import moment from 'moment';
import 'moment/locale/fr';
import BarChart from '../components/BarChart';
import Achievements from '../components/Achievements';
import HabitsTable from '../components/HabitsTable';
import CalendarCard from '../components/CalendarCard';
import CardWrapper from '../components/CardWrapper';
import CardWrapperPlain from '../components/CardWrapperPlain';

export default function DashBoard() {
  const date = new Date();
  const [value, onChange] = useState<any>(date);
  const startOfWeek = moment(value).startOf('week');

  const week = Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'day').format('YYYY-MM-DD'));

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className='mt-2'>
        <div className='flex flex-col lg:flex-row items-center lg:justify-between min-h-[272px] lg:h-full m-2 gap-4'>
          <CardWrapper>
            <BarChart week={week} />
          </CardWrapper>
          <CardWrapper>
            <Achievements />
          </CardWrapper>
          <CardWrapperPlain>
            <CalendarCard value={value} onChange={onChange} week={week} />
          </CardWrapperPlain>
        </div>
        <HabitsTable week={week} />
      </div>
    </Suspense>
  );
}
