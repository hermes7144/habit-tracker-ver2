import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/fr';
import { HabitType } from '../types/types';
import { useHabitsHooks } from '../context/HabitsContext';

export default function HabitsTable({ week }) {
  const navigate = useNavigate();
  const { useHabits } = useHabitsHooks();
  const {
    habitsQuery: { data: habits },
    checksQuery: { data: checkmarks },
    addOrUpdateCheckItem,
    removeCheckItem,
  } = useHabits();

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const filteredHabits = habits.filter((habit) => !habit.completed);

  const date = new Date();
  const today = formatDate(date);

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
                {week.map((date) => (
                  <th key={date} className={`w-1/12 px-3 align-middle border border-solid py-3 text-xs font-bold text-center whitespace-nowrap bg-blueGray-50 text-blueGray-500 border-blueGray-100`}>
                    {moment(date).format('MM-DD')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredHabits.map((habit: HabitType) => (
                <tr key={habit.id}>
                  <th
                    className='px-6 text-left text-xs p-4 whitespace-nowrap  text-blueGray-800 underline hover:cursor-pointer'
                    onClick={() => {
                      navigate(`/habits/${habit.id}`, { state: { habit, checkmarks } });
                    }}>
                    {habit.title}
                  </th>
                  {checkmarks &&
                    week.map((date, index) => {
                      const freq = habit.frequency.includes(index);
                      const isChecked = checkmarks?.some((checkmark) => checkmark.habitId === habit.id && checkmark.date === date);
                      const isToday = date === String(today);

                      return (
                        <td className='text-center' key={date}>
                          {freq && <input type='checkbox' data-testid={`${habit.id}-${date}`} className={isToday ? '' : 'opacity-50 bg-gray-100'} checked={isChecked} disabled={!isToday} onChange={(e) => handleChange(e, habit.id, date)} />}
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
