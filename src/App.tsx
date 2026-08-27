import { NavLink, Link, Outlet, ScrollRestoration, useLocation, useNavigate } from 'react-router-dom';
import styles from './App.module.css';
import PlayerSearchInput from './components/PlayerSearchInput';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  function handlePlayerSearch(query: string) {
    if (location.pathname === '/playerSearch') {
      navigate(`/playerSearch?query=${query}`, { replace: true });
    } else {
      navigate(`/playerSearch?query=${query}`);
    }
  }

  return (
    <div className={styles.app}>
      <nav className={styles.nav}>
        <Link className={styles.brand} to="/">
          <span>ThomZz NHL app</span>
        </Link>
        <div>
          <PlayerSearchInput onSearch={handlePlayerSearch} />
        </div>
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
