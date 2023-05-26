import { HabitType } from '../pages/NewHabit';

export default function Habit({ habit: { title, description, frequency } }: { habit: HabitType }) {
  return <>{description}</>;
}
