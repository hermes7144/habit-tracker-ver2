import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../Calendar.css';
import moment from 'moment';
import 'moment/locale/fr';
import { HabitType } from './NewHabitPage';
import useHabits from '../hooks/useHabits';

export type CheckType = {
  id: string;
  title: string;
  status: string;
  date: string;
  createdAt: Date;
};

export default function DashBoard() {
  const {
    habitsQuery: { isLoading, data: habits },
    checksQuery: { isLoading: isLoading2, data: checkmarks },
    addOrUpdateCheckItem,
    removeCheckItem,
  } = useHabits();

  const date = new Date();
  const today = moment(date).format('YYYY-MM-DD');

  const [value, setValue] = useState<any>(date);
  const startOfWeek = moment(value).startOf('week');

  const weeklyData = Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'day').format('YYYY-MM-DD'));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, habit: HabitType, date: String) => {
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
    <div className='mt-2'>
      <div className='flex m-5'>
        <Calendar onChange={setValue} value={value} calendarType='US' />
      </div>
      <div className={`relative flex flex-col min-w-0 break-words w-full my-6 shadow-lg rounded`}>
        <div className='block w-full overflow-x-auto'>
          <table className='items-center w-full bg-transparent border-collapse'>
            <thead>
              <tr>
                <th className={`w-5/12 px-6 align-middle border border-solid py-3 text-xs whitespace-nowrap font-semibold text-center bg-blueGray-50 text-blueGray-500 border-blueGray-100`}>Habit</th>
                {weeklyData.map((date) => (
                  <th key={date} className={`w-1/12 px-6 align-middle border border-solid py-3 text-xs font-semibold text-center bg-blueGray-50 text-blueGray-500 border-blueGray-100`}>
                    {date}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {habits?.map((habit: HabitType) => (
                <tr key={habit.id}>
                  <th className='px-6 align-middle text-xs p-4'>{habit.title}</th>
                  {checkmarks &&
                    weeklyData.map((date, index) => {
                      const freq = habit.frequency.includes(String(index));
                      const isChecked = checkmarks?.some((checkmark) => checkmark.title === habit.title && checkmark.date === date);
                      const isToday = date === String(today);

                      return (
                        <td className='text-center' key={date}>
                          {freq && <input type='checkbox' className={isToday ? '' : 'opacity-50 bg-gray-100'} name={habit.id} checked={isChecked} disabled={!isToday} onChange={(e) => handleChange(e, habit, date)} />}
                        </td>
                      );
                    })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
