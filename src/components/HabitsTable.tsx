import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/fr';
import { HabitType } from '../types/types';
import { useHabitsHooks } from '../context/HabitsContext';

export default function HabitsTable({ week, filter }) {
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

  const filtered = filterValue(filter, habits);

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
              {filtered.map((habit: HabitType) => {
                return (
                  <tr key={habit.id}>
                    <th
                      className='px-6 text-left text-xs p-4 whitespace-nowrap underline hover:cursor-pointer'
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

                        let isTargetTimePast;
                        if (isToday && habit.limitTime) {
                          const currentTime = new Date();
                          const targetTime = new Date();
                          const targetTimeString = habit.limitTime; // 유동적으로 바뀌는 시간 값

                          // targetTimeString에서 시간 값을 추출
                          const [targetHour, targetMinute] = targetTimeString.split(':').map(Number);

                          targetTime.setHours(targetHour, targetMinute, 0, 0);

                          // 현재 시간과 targetTime의 시간을 비교
                          isTargetTimePast = targetTime < currentTime;
                        }

                        return (
                          <td className='text-center' key={date}>
                            {freq && <input type='checkbox' id={`${habit.id}-${date}`} data-testid={`${habit.id}-${date}`} className={isToday ? (isTargetTimePast ? 'bg-red-200' : '') : 'opacity-50 bg-gray-100'} checked={isChecked} disabled={!isToday} onChange={(e) => handleChange(e, habit.id, date)} />}
                          </td>
                        );
                      })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function filterValue(filter, habits) {
  if (habits === null) return;
  if (filter === 'all') {
    return habits;
  } else if (filter === 'active') {
    return habits.filter((habit) => habit.status === false);
  } else if (filter === 'completed') {
    return habits.filter((habit) => habit.status === true);
  }
}
