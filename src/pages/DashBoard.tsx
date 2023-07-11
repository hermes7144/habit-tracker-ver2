import React, { useState, Suspense } from 'react';

import moment from 'moment';
import 'moment/locale/fr';
import BarChart from '../components/BarChart';
import Achievements from '../components/Achievements';
import HabitsTable from '../components/HabitsTable';
import CardWrapper from '../components/CardWrapper';
import CalendarCard from '../components/CalendarCard';
import HabitFilter from '../components/HabitFilter';

export default function DashBoard() {
  const date = new Date();
  const [value, onChange] = useState<any>(date);
  const startOfWeek = moment(value).startOf('week');

  const week = Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'day').format('YYYY-MM-DD'));

  const tileClassName = ({ date }) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    if (week.includes(formattedDate)) {
      const isFirstDate = week[0] === formattedDate;
      const isLastDate = week[week.length - 1] === formattedDate;
      const classNames = `highlight ${isFirstDate ? 'highlight--first' : ''}${isLastDate ? 'highlight--last' : ''}`;
      return classNames;
    }
  };

  const filters = ['all', 'active', 'completed'];
  const [filter, setFilter] = useState(filters[1]);

  const handleFilter = (index) => {
    setFilter(filters[index]);
  };

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
          <CardWrapper plain>
            <CalendarCard value={value} onChange={onChange} tileClassName={tileClassName} />
          </CardWrapper>
        </div>
        <div>
          <HabitFilter filters={filters} filter={filter} onFilter={handleFilter} />
          <HabitsTable week={week} filter={filter} />
        </div>
      </div>
    </Suspense>
  );
}
