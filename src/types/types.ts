export type HabitType = {
  id?: any;
  title?: string;
  description?: string;
  frequency: number[];
  date?: any;
  createdAt?: any;
  completed?: boolean;
};

export type CheckType = {
  id: string;
  title: string;
  date: string;
  createdAt: Date;
  habitId: string;
};
