import { useQuery, useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { getHabits, addOrUpdateHabit, getChecks, addOrUpdateCheck, removeCheck, removeHabit } from '../api/firebase';
import { CheckType, HabitType } from '../pages/DashBoard';

export default function useHabits(habitId?: String) {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const habitsQuery: UseQueryResult<HabitType[]> = useQuery(['habits'], () => getHabits(uid), { enabled: !!uid });

  const addOrUpdateItem = useMutation((habit: HabitType) => addOrUpdateHabit(uid, habit), {
    onSuccess: () => {
      queryClient.invalidateQueries(['habits']);
    },
  });

  const removeItem = useMutation((id) => removeHabit(uid, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['habits']);
    },
  });

  const checksQuery = useQuery<CheckType[]>(['checks'], () => getChecks(uid), { enabled: !!uid });

  const addOrUpdateCheckItem = useMutation((check: any) => addOrUpdateCheck(uid, check), {
    onSuccess: () => {
      queryClient.invalidateQueries(['checks']);
    },
  });

  const removeCheckItem = useMutation((checkId: any) => removeCheck(uid, checkId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['checks']);
    },
  });

  return { habitsQuery, addOrUpdateItem, removeItem, checksQuery, addOrUpdateCheckItem, removeCheckItem };
}
