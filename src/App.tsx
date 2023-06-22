import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import Navbar from './components/Navbar';
import IndexNavbar from './components/IndexNavbar';
import HabitProvider from './context/HabitProvider';

function App() {
  const queryClient = new QueryClient();

  return (
    // 여기서 쪼개면 될 거 같다.
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HabitProvider>
          <IndexNavbar />
          <Outlet />
        </HabitProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

