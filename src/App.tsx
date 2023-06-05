import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContextProvider';
import Navbar from './components/Navbar';
import IndexNavbar from './components/IndexNavbar';

function App() {
  const queryClient = new QueryClient();

  return (
    // 여기서 쪼개면 될 거 같다.
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <IndexNavbar />
        <Outlet />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;

