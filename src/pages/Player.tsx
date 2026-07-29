import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import playerQuery from '../queries/player';
import { CircularProgress } from '@mui/material';
import styles from './Player.module.css';

export default function Player() {
  const routeParams = useParams();
  const { data: player, isLoading: isPlayerLoading } = useQuery({
    ...playerQuery.detail(routeParams.playerId!),
    enabled: !!routeParams.playerId
  });
  return (
    <section className={styles.mainSection}>
      {isPlayerLoading ? (
        <>
          <CircularProgress size="106px" aria-label="Loading…" />
          <p>Loading player stats…</p>
        </>
      ) : (
        <>
          <div
            className={styles.playerPhoto}
            style={{ backgroundImage: `url(${player?.heroImage})` }}
            role="img"
            aria-label={`${player?.firstName.default} ${player?.lastName.default}`}
          />
          <div className={styles.headerContent}>
            <h1>
              {player?.firstName.default} {player?.lastName.default}
            </h1>
          </div>
        </>
      )}
    </section>
  );
}
