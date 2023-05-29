import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { getHabits, addOrUpdateHabit, getChecks, addOrUpdateCheck, removeCheck, removeHabit } from '../api/firebase';
import { HabitType } from '../pages/NewHabit';
import { CheckType } from '../pages/DashBoard';

export default function useHabits() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const habitsQuery = useQuery(['habits', uid || ''], () => getHabits(uid), { enabled: !!uid });

  const addOrUpdateItem = useMutation((habit: HabitType) => addOrUpdateHabit(uid, habit), {
    onSuccess: () => {
      queryClient.invalidateQueries(['habits', uid]);
    },
  });

  const removeItem = useMutation((id) => removeHabit(uid, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['habits', uid]);
    },
  });

  const checksQuery = useQuery<CheckType[]>(['checks', uid || ''], () => getChecks(uid), { enabled: !!uid });

  const addOrUpdateCheckItem = useMutation((check: any) => addOrUpdateCheck(uid, check), {
    onSuccess: () => {
      queryClient.invalidateQueries(['checks', uid]);
    },
  });

  const removeCheckItem = useMutation((checkId: any) => removeCheck(uid, checkId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['checks', uid]);
    },
  });

  return { habitsQuery, addOrUpdateItem, removeItem, checksQuery, addOrUpdateCheckItem, removeCheckItem };
}
