import { PropagateLoader } from 'react-spinners';
import { useAuthContext } from '../context/AuthContext';
import AuthedPage from './AuthedPage';
import Landing from './LandingPage';

export default function IndexPage() {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <PropagateLoader color='#0176d6' loading={true} />
      </div>
    );
  }

  return <>{user ? <AuthedPage /> : <Landing />}</>;
}
