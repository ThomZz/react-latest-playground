import { NavLink, Link, Outlet, ScrollRestoration } from 'react-router-dom';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.app}>
      <nav className={styles.nav}>
        <Link className={styles.brand} to="/">
          <span>ThomZz NHL app</span>
        </Link>
        <div className={styles.links}>
          <NavLink to="/about">About</NavLink>
        </div>
      </nav>
      <div className={styles.content}>
        <Outlet />
        <ScrollRestoration
          getKey={(location) => {
            return location.key;
          }}
        />
      </div>
    </div>
  );
}
