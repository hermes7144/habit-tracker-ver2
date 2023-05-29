import { useAuthContext } from '../context/AuthContext';
import AuthPage from './AuthPage';
import Landing from './Landing';

export default function Index() {
  const { user } = useAuthContext();

  return <>{user ? <AuthPage /> : <Landing />}</>;
}
