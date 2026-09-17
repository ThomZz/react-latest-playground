import type { ScoreboardGame } from '../api/models/scoreboard';
import styles from './ScoreboardGameCard.module.css';

type Props = {
  game: ScoreboardGame;
};

const GAME_TYPE_LABEL: Partial<Record<number, string>> = {
  1: 'Preseason',
  3: 'Playoffs'
};

function getStatusLabel(game: ScoreboardGame): string {
  switch (game.gameState) {
    case 'OFF':
      if (game.period && game.period > 3) {
        return game.periodDescriptor?.periodType === 'SO' ? 'F/SO' : 'F/OT';
      }
      return 'Final';
    case 'LIVE':
    case 'CRIT': {
      const pd = game.periodDescriptor;
      if (!pd) return 'Live';
      if (pd.periodType === 'OT') return 'OT';
      if (pd.periodType === 'SO') return 'SO';
      return `P${pd.number}`;
    }
    case 'PRE':
      return 'Pre-game';
    default:
      return '';
  }
}

export default function ScoreboardGameCard({ game }: Props) {
  const { awayTeam, homeTeam, gameState, gameType, startTimeUTC } = game;
  const gameTypeLabel = GAME_TYPE_LABEL[gameType];
  const isLive = gameState === 'LIVE' || gameState === 'CRIT';
  const hasScore = awayTeam.score !== undefined && homeTeam.score !== undefined;
  const statusLabel = getStatusLabel(game);

  const startDate = new Date(startTimeUTC);
  const dateLabel = startDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  const startTime = startDate.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });

  return (
    <div className={styles.card}>
      <div className={styles.dateTime}>
        {gameTypeLabel && (
          <span className={`${styles.gameTypeBadge}${gameType === 3 ? ` ${styles.gameTypeBadgePlayoffs}` : ''}`}>
            {gameTypeLabel}
          </span>
        )}
        <span className={gameTypeLabel ? styles.dateTimeText : styles.dateTimeTextCentered}>
          {dateLabel} · {startTime}
        </span>
      </div>
      <div className={styles.teams}>
        <div className={styles.team}>
          <img src={awayTeam.logo} alt={awayTeam.abbrev} className={styles.logo} />
          <span className={styles.abbrev}>{awayTeam.abbrev}</span>
          {!hasScore && awayTeam.record && <span className={styles.record}>{awayTeam.record}</span>}
        </div>
        <div className={styles.center}>
          {hasScore ? (
            <span className={styles.score}>
              {awayTeam.score} – {homeTeam.score}
            </span>
          ) : (
            <span className={styles.time}>VS</span>
          )}
        </div>
        <div className={styles.team}>
          <img src={homeTeam.logo} alt={homeTeam.abbrev} className={styles.logo} />
          <span className={styles.abbrev}>{homeTeam.abbrev}</span>
          {!hasScore && homeTeam.record && <span className={styles.record}>{homeTeam.record}</span>}
        </div>
      </div>
      {statusLabel && <span className={`${styles.status}${isLive ? ` ${styles.statusLive}` : ''}`}>{statusLabel}</span>}
    </div>
  );
}
