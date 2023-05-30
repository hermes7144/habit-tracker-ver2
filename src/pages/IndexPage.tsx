import { PropagateLoader } from 'react-spinners';
import { useAuthContext } from '../context/AuthContext';
import AuthPage from './AuthPage';
import Landing from './LandingPage';

export default function IndexPage() {
  const { user, isLoading } = useAuthContext();
  console.log(isLoading);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <PropagateLoader color='#0176d6' loading={true} />
      </div>
    );
  }

  return <>{user ? <AuthPage /> : <Landing />}</>;
}
