import { NavLink, Outlet } from 'react-router-dom';
import styles from './App.module.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 10, // Keep inactive data in memory for 10 minutes
      staleTime: 1000 * 60 * 5 // Consider data fresh for 5 minutes
    }
  }
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.app}>
        <nav className={styles.nav}>
          <span className={styles.brand}>⚛️ React Playground</span>
          <div className={styles.links}>
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/about">About</NavLink>
          </div>
        </nav>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </QueryClientProvider>
  );
}
