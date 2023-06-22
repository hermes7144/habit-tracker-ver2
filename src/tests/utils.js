import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Routes } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { HabitContext } from '../context/HabitContext';

export function withRouter(routes, initialEntry = '/') {
  return <MemoryRouter initialEntry={[initialEntry]}>
    <Routes>{routes}</Routes>
  </MemoryRouter>
}

export function withAllContexts(children, useHabits, user = null) {

  const testClient = createTestQueryClient();
  return (
    <AuthContext.Provider value={{ user, uid: 'uid' }}>
      <HabitContext.Provider value={{ useHabits }}>
        <QueryClientProvider client={testClient}>{children}</QueryClientProvider>
      </HabitContext.Provider>
    </AuthContext.Provider >


  )
}


function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {
      }
    }
  })
}