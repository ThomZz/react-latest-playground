import { Link } from 'react-router';
import { type Team } from '../api/team';
import styles from './TeamCard.module.css';

type TeamProps = {
  team: Team;
};

export default function TeamCard({ team }: TeamProps) {
  return (
    <Link
      className={styles.container}
      to={`/team/${team.abbrev.default}`}
      key={team.abbrev.default}
    >
      <p className={styles.name}>{team.commonName.default}</p>
      <img
        className={styles.logo}
        width="100"
        height="100"
        src={team.logoDark}
        alt={team.commonName.default}
      />
    </Link>
  );
}
