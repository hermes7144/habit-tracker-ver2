import React, { useState } from 'react';
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

export default function DashBoard() {
  const {
    habitsQuery: { isLoading, error, data: habits },
    checksQuery: { isLoading: isLoading2, data: checkmarks },
    addOrUpdateCheckItem,
    removeCheckItem,
  } = useHabits();

  const [value, setValue] = useState<any>(new Date());
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
      <Calendar onChange={setValue} value={value} calendarType='US' />
      <div className={`relative flex flex-col min-w-0 break-words w-full my-6 shadow-lg rounded`}>
        <div className='block w-full overflow-x-auto'>
          <table className='items-center w-full bg-transparent border-collapse'>
            <thead>
              <tr>
                <th className={`px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-blueGray-50 text-blueGray-500 border-blueGray-100`}>Habit</th>
                {weeklyData.map((date) => (
                  <th key={date} className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-blueGray-50 text-blueGray-500 border-blueGray-100`}>
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
                    weeklyData.map((date, index) => {
                      const freq = habit.frequency.includes(String(index));
                      const isChecked = checkmarks?.some((checkmark) => checkmark.title === habit.title && checkmark.date === date);

                      return (
                        <td className='text-center' key={date}>
                          {freq && <input type='checkbox' className='align-middle' name={habit.id} checked={isChecked} onChange={(e) => handleChange(e, habit, date)} />}
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
