import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { addOrUpdateHabit, getHabits } from '../api/firebase';
import { HabitType } from '../pages/NewHabit';

export default function UseHabits() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const habitsQuery = useQuery(['habits', uid || ''], () => getHabits(uid), { enabled: !!uid });

  const addOrUpdateItem = useMutation((habit: HabitType) => addOrUpdateHabit(uid, habit), {
    onSuccess: () => {
      queryClient.invalidateQueries(['habits', uid]);
    },
  });

  return { habitsQuery, addOrUpdateItem };
}
