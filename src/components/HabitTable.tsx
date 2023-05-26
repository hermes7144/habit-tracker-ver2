import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import 'moment/locale/fr';
import { HabitType } from '../pages/NewHabit';
import useHabits from '../hooks/useHabits';

export type CheckType = {
  id: string;
  title: string;
  status: string;
  date: string;
  createdAt: Date;
};

export default function HabitTable() {
  const {
    habitsQuery: { isLoading, error, data: habits },
    checksQuery: { isLoading: isLoading2, data: checkmarks },
    addOrUpdateCheckItem,
    removeCheckItem,
  } = useHabits();

  const [value, setValue] = useState<any>(new Date());

  const color = 'light';
  const startOfWeek = moment(value).startOf('week');

  const weeklyData = Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'day').format('YYYY-MM-DD'));

  const handleChange = (e, habit, date) => {
    const status = e.target.checked ? 'completed' : '';
    const { title } = habit;

    if (status) {
      addOrUpdateCheckItem.mutate({ title, date, status });
    } else {
      const checkmark = checkmarks.find((checkmark) => checkmark.title === title && checkmark.date === date);
      if (checkmark) {
        removeCheckItem.mutate(checkmark.id);
      }
    }
  };

  if (isLoading || isLoading2) <p>Loading...</p>;

  return (
    <>
      <Calendar onChange={setValue} value={value} />

      <div className={`relative flex flex-col min-w-0 break-words w-full my-6 shadow-lg rounded ${color === 'light' ? 'bg-white' : 'bg-lightBlue-900 text-white'}`}>
        <div className='block w-full overflow-x-auto'>
          {/* Projects table */}
          <table className='items-center w-full bg-transparent border-collapse'>
            <thead>
              <tr>
                <th className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}`}>Habit</th>
                {weeklyData.map((date) => (
                  <th key={date} className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700'}`}>
                    {date}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {habits?.map((habit: HabitType) => (
                <tr key={habit.id}>
                  <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>{habit.title}</th>
                  {checkmarks &&
                    weeklyData.map((date) => {
                      const isChecked = checkmarks?.some((checkmark) => checkmark.title === habit.title && checkmark.date === date);
                      return (
                        <td key={date}>
                          <input type='checkbox' name={habit.id} checked={isChecked} onChange={(e) => handleChange(e, habit, date)} />
                        </td>
                      );
                    })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
