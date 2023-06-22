import { createContext, useContext } from 'react';

interface IHabitsContext {
  useHabits: any;
}

export const HabitContext = createContext<IHabitsContext | null>(null);

export function useHabitHooks() {
  return useContext(HabitContext);
}
