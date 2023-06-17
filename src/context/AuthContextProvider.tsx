import React from 'react';
import { useEffect, useState } from 'react';
import { login, logout, onUserStateChange } from '../api/firebase';

import { User } from '@firebase/auth';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onUserStateChange((user: User) => {
      setUser(user);
      setIsLoading(false);
      navigate('/');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AuthContext.Provider value={{ user, uid: user?.uid, login, logout, isLoading }}>{children}</AuthContext.Provider>;
}
