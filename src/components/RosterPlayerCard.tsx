import { Link } from 'react-router';
import { type Player } from '../api/models/player';
import styles from './RosterPlayerCard.module.css';

type RosterPlayerComponentProps = {
  player: Player;
};

export default function RosterPlayerCard({ player }: RosterPlayerComponentProps) {
  return (
    <Link key={player.id} className={styles.container} to={`/player/${player.id}`}>
      <span className={styles.position}>{player.positionCode}</span>
      {player.sweaterNumber != null && <span className={styles.sweaterNumber}>#{player.sweaterNumber}</span>}
      <img
        className={styles.logo}
        src={player.headshot}
        alt={`${player.firstName.default} ${player.lastName.default}`}
      />
      <p className={styles.name}>
        {player.firstName.default} {player.lastName.default}
      </p>
    </Link>
  );
}
