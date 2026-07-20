import { NavLink, Link, Outlet } from 'react-router-dom';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.app}>
      <nav className={styles.nav}>
        <Link className={styles.brand} to="/">
          <span>⚛️ React Playground</span>
        </Link>
        <div className={styles.links}>
          <NavLink to="/about">About</NavLink>
        </div>
      </nav>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
