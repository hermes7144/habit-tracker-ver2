import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../Calendar.css';
import moment from 'moment';
import 'moment/locale/fr';
import { HabitType } from './NewHabitPage';
import useHabits from '../hooks/useHabits';
import BarChart from '../components/BarChart';
import Achievements from '../components/Achievements';

export type CheckType = {
  id: string;
  title: string;
  status: string;
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
  const beforeWeek = moment(value).subtract(1, 'w').startOf('week');

  const weeklyData = Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'day').format('YYYY-MM-DD'));
  const laskWeekData = Array.from({ length: 7 }, (_, i) => beforeWeek.clone().add(i, 'day').format('YYYY-MM-DD'));
  const weeklyDataMMDD = Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'day').format('MM-DD'));

  const freq = weeklyData.indexOf(today);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, habit: HabitType, date: String) => {
    const status = e.target.checked ? 'completed' : '';
    const { id } = habit;

    if (status) {
      addOrUpdateCheckItem.mutate({ habitId: id, date, status });
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
      <div className={`flex flex-col md:flex-row  ${window.innerWidth <= 768 ? 'items-center' : 'justify-between'} m-5 gap-4`}>
        <div className='max-w-sm lg:w-4/12 px-4 pt-10 shadow-lg rounded'>{<BarChart dates={weeklyData} labels={weeklyDataMMDD} habits={habits} checkmarks={checkmarks} />}</div>
        <div className='max-w-sm lg:w-4/12 px-4 shadow-lg rounded'>
          <Achievements habits={habits} checkmarks={checkmarks} weeklyData={weeklyData} laskWeekData={laskWeekData} today={today} freq={freq} />
        </div>
        <div className=' lg:w-4/12'>
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
                        const freq = habit.frequency.includes(String(index));
                        const isChecked = checkmarks?.some((checkmark) => checkmark.habitId === habit.id && checkmark.date === date);
                        const isToday = date === String(today);

                        return (
                          <td className='text-center ' key={date}>
                            {freq && <input type='checkbox' className={isToday ? '' : 'opacity-50 bg-gray-100'} name={habit.id} checked={isChecked} onChange={(e) => handleChange(e, habit, date)} />}
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
