import { HabitType } from '../pages/NewHabitPage';

export default function Habit({ habit: { title, description, frequency } }: { habit: HabitType }) {
  return <>{description}</>;
}
