import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import

import moment from 'moment';
import 'moment/locale/fr';
import { HabitType } from '../pages/NewHabit';
import useHabits from '../hooks/useHabits';

export default function HabitTable() {
  const {
    habitsQuery: { isLoading, error, data: habits },
    checksQuery: { data: checks },
  } = useHabits();

  const { addOrUpdateCheckItem, removeCheckItem } = useHabits();

  const [value, setValue] = useState<any>(new Date());

  const color = 'light';

  const startOfWeek = moment(value).startOf('week');

  // range로 weekData 만드는거 찾기
  const weeklyData = [startOfWeek.format('YYYY-MM-DD'), startOfWeek.add(1, 'day').format('YYYY-MM-DD'), startOfWeek.add(1, 'day').format('YYYY-MM-DD'), startOfWeek.add(1, 'day').format('YYYY-MM-DD'), startOfWeek.add(1, 'day').format('YYYY-MM-DD'), startOfWeek.add(1, 'day').format('YYYY-MM-DD'), startOfWeek.add(1, 'day').format('YYYY-MM-DD')];

  const handleChange = (e, habit, date) => {
    const status = e.target.checked ? 'completed' : '';
    const { title, id } = habit;
    if (status) addOrUpdateCheckItem.mutate({ title, date, status });
    else removeCheckItem.mutate({ id });
  };

  return (
    <>
      <div>
        <Calendar onChange={setValue} value={value} />
      </div>
      <div className={'relative flex flex-col min-w-0 break-words w-full my-6 shadow-lg rounded' + (color === 'light' ? 'bg-white' : 'bg-lightBlue-900 text-white')}>
        <div className='block w-full overflow-x-auto'>
          {/* Projects table */}
          <table className='items-center w-full bg-transparent border-collapse'>
            <thead>
              <tr>
                <th className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' + (color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')}>Habit</th>
                {weeklyData.map((date) => (
                  <th className={'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' + (color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')}>{date}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {habits &&
                habits.map((habit: HabitType) => (
                  <tr key={habit.id}>
                    <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>{habit.title}</th>
                    {weeklyData.map((date) => (
                      <td>
                        <input type='checkbox' onChange={(e) => handleChange(e, habit, date)} />
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
