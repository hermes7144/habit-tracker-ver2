import { createContext, useContext } from 'react';

interface IHabitsContext {
  useHabits: any;
}

export const HabitsContext = createContext<IHabitsContext | null>(null);

export function useHabitsHooks() {
  return useContext(HabitsContext);
}
