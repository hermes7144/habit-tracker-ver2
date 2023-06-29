import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import IndexNavbar from './components/IndexNavbar';
import HabitsProvider from './context/HabitsProvider';

function App() {
  const queryClient = new QueryClient();

  return (
    // 여기서 쪼개면 될 거 같다.
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HabitsProvider>
          <IndexNavbar />
          <Outlet />
        </HabitsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

