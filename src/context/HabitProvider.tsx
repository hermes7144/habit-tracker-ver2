import { HabitContext } from './HabitContext';
import useHabits from '../hooks/useHabits';

export default function HabitProvider({ children }: { children: React.ReactNode }) {
  return <HabitContext.Provider value={{ useHabits }}>{children}</HabitContext.Provider>;
}
