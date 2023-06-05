import { createContext, useContext } from 'react';
import { User } from '@firebase/auth';

type UserType = {
  user: User | null;
  uid?: string;
  login: (provider: string) => {};
  logout: () => void;
  isLoading: boolean;
};

export const AuthContext = createContext<UserType | null>(null);

export function useAuthContext() {
  return useContext(AuthContext);
}
