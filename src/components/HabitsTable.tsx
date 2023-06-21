import { useNavigate } from 'react-router-dom';
import useHabits from '../hooks/useHabits';
import moment from 'moment';
import 'moment/locale/fr';
import { HabitType } from '../types/types';

export default function HabitsTable({ weeklyData, labels, habits, checkmarks }) {
  const navigate = useNavigate();
  const { addOrUpdateCheckItem, removeCheckItem } = useHabits();

  const date = new Date();
  const today = moment(date).format('YYYY-MM-DD');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, habitId: String, date: String) => {
    if (e.target.checked) {
      addOrUpdateCheckItem.mutate({ habitId, date });
    } else {
      const checkmark = checkmarks.find((checkmark) => checkmark.habitId === habitId && checkmark.date === date);
      if (checkmark) removeCheckItem.mutate(checkmark.id);
    }
  };
  return (
    <div className='m-2'>
      <div className={`relative flex flex-col min-w-0 break-words w-full shadow-lg rounded`}>
        <div className='block w-full overflow-x-auto'>
          <table className='items-center w-full bg-transparent border-collapse'>
            <thead>
              <tr>
                <th className={`w-5/12 px-2 align-middle border border-solid py-3 text-xs whitespace-nowrap font-bold text-center bg-blueGray-50 text-blueGray-500 border-blueGray-100`}>Habit</th>
                {labels.map((date) => (
                  <th key={date} className={`w-1/12 px-3 align-middle border border-solid py-3 text-xs font-bold text-center whitespace-nowrap bg-blueGray-50 text-blueGray-500 border-blueGray-100`}>
                    {date}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {habits?.map((habit: HabitType) => (
                <tr key={habit.id}>
                  <th
                    className='px-6 text-left text-xs p-4 whitespace-nowrap  text-blueGray-800 underline hover:cursor-pointer'
                    onClick={() => {
                      navigate(`/habits/${habit.id}`, { state: { habit, checkmarks } });
                    }}>
                    {habit.title}
                  </th>

                  {checkmarks &&
                    weeklyData.map((date, index) => {
                      const freq = habit.frequency.includes(index);
                      const isChecked = checkmarks?.some((checkmark) => checkmark.habitId === habit.id && checkmark.date === date);
                      const isToday = date === String(today);

                      return (
                        <td className='text-center' key={date}>
                          {freq && <input type='checkbox' className={isToday ? '' : 'opacity-50 bg-gray-100'} checked={isChecked} disabled={!isToday} onChange={(e) => handleChange(e, habit.id, date)} />}
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
