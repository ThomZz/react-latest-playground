import { useQuery } from '@tanstack/react-query';
import rosterQuery from '../queries/roster';
import styles from './Team.module.css';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function Team() {
  const routeParams = useParams();
  const { data: roster, isLoading: isRosterLoading } = useQuery({
    ...rosterQuery.detail(routeParams.id!),
    enabled: !!routeParams.id
  });
  const forwards = roster?.forwards ?? [];
  const defensemen = roster?.defensemen ?? [];
  const goalies = roster?.goalies ?? [];

  return (
    <section className={styles.mainSection}>
      {isRosterLoading ? (
        <>
          <CircularProgress size="106px" aria-label="Loading…" />
          <p>Loading roster…</p>
        </>
      ) : (
        <div className={styles.rosterContainer}>
          {forwards.map((player) => (
            <div key={player.id} className={styles.playerCard}>
              <img
                className={styles.logo}
                src={player.headshot}
                alt={`${player.firstName.default} ${player.lastName.default}`}
              />
              <p className={styles.name}>
                {player.firstName.default} {player.lastName.default}
              </p>
            </div>
          ))}
          {defensemen.map((player) => (
            <div key={player.id} className={styles.playerCard}>
              <img
                className={styles.logo}
                src={player.headshot}
                alt={`${player.firstName.default} ${player.lastName.default}`}
              />
              <p className={styles.name}>
                {player.firstName.default} {player.lastName.default}
              </p>
            </div>
          ))}
          {goalies.map((player) => (
            <div key={player.id} className={styles.playerCard}>
              <img
                className={styles.logo}
                src={player.headshot}
                alt={`${player.firstName.default} ${player.lastName.default}`}
              />
              <p className={styles.name}>
                {player.firstName.default} {player.lastName.default}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
