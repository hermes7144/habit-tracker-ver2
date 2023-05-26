import { useAuthContext } from '../context/AuthContext';
import DashBoard from './DashBoard';
import Landing from './Landing';

export default function Index() {
  const { user } = useAuthContext();

  return <>{user ? <DashBoard /> : <Landing />}</>;
}
