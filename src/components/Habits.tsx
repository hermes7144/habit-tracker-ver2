import UseHabit from '../hooks/useHabits';
import { HabitType } from '../pages/NewHabit';
import Habit from './habit';

export default function Habits() {
  const {
    habitsQuery: { isLoading, error, data: habits },
  } = UseHabit();

  return <>{habits && habits.map((habit: HabitType) => <Habit habit={habit} />)}</>;
}
