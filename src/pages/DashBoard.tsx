import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../Calendar.css';
import moment from 'moment';
import 'moment/locale/fr';
import useHabits from '../hooks/useHabits';
import BarChart from '../components/BarChart';
import Achievements from '../components/Achievements';

export type HabitType = {
  id?: string;
  title?: string;
  description?: string;
  frequency: number[];
  date?: any;
};

export type CheckType = {
  id: string;
  title: string;
  date: string;
  createdAt: Date;
  habitId: string;
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
  const weeklyDataMMDD = Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'day').format('MM-DD'));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, habit: HabitType, date: String) => {
    const { id } = habit;

    if (e.target.checked) {
      addOrUpdateCheckItem.mutate({ habitId: id, date });
    } else {
      const checkmark = checkmarks.find((checkmark) => checkmark.habitId === id && checkmark.date === date);
      if (checkmark) {
        removeCheckItem.mutate(checkmark.id);
      }
    }
  };

  if (isLoading || isLoading2) return <p>Loading...</p>;

  return (
    <div className='mt-2'>
      <div className={`flex flex-col md:flex-row  ${window.innerWidth <= 768 ? 'items-center' : 'justify-between'} m-2 gap-4`}>
        <div className='w-full lg:max-w-md lg:w-4/12 px-2 pt-10 shadow-lg rounded flex justify-center'>{<BarChart dates={weeklyData} labels={weeklyDataMMDD} habits={habits} checkmarks={checkmarks} />}</div>
        <div className='w-full lg:max-w-md lg:w-4/12 px-2 shadow-lg rounded'>
          <Achievements />
        </div>
        <div className='w-full lg:w-4/12'>
          <Calendar onChange={setValue} value={value} calendarType='US' />
        </div>
      </div>
      <div className='m-2'>
        <div className={`relative flex flex-col min-w-0 break-words w-full shadow-lg rounded`}>
          <div className='block w-full overflow-x-auto'>
            <table className='items-center w-full bg-transparent border-collapse'>
              <thead>
                <tr>
                  <th className={`w-5/12 px-2 align-middle border border-solid py-3 text-xs whitespace-nowrap font-semibold text-center bg-blueGray-50 text-blueGray-500 border-blueGray-100`}>Habit</th>
                  {weeklyDataMMDD.map((date) => (
                    <th key={date} className={`w-1/12 px-3 align-middle border border-solid py-3 text-xs font-semibold text-center whitespace-nowrap bg-blueGray-50 text-blueGray-500 border-blueGray-100`}>
                      {date}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {habits?.map((habit: HabitType) => (
                  <tr key={habit.id}>
                    <th className='px-6 text-left text-xs p-4 whitespace-nowrap'>{habit.title}</th>
                    {checkmarks &&
                      weeklyData.map((date, index) => {
                        const freq = habit.frequency.includes(index);
                        const isChecked = checkmarks?.some((checkmark) => checkmark.habitId === habit.id && checkmark.date === date);
                        const isToday = date === String(today);

                        return (
                          <td className='text-center' key={date}>
                            {freq && <input type='checkbox' className={isToday ? '' : 'opacity-50 bg-gray-100'} checked={isChecked} disabled={!isToday} onChange={(e) => handleChange(e, habit, date)} />}
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
    </div>
  );
}
