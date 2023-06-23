import { HabitsContext } from './HabitsContext';
import useHabits from '../hooks/useHabits';

export default function HabitsProvider({ children }: { children: React.ReactNode }) {
  return <HabitsContext.Provider value={{ useHabits }}>{children}</HabitsContext.Provider>;
}
