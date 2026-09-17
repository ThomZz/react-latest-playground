import { useQuery } from '@tanstack/react-query';
import scoreboardQuery from '../queries/scoreboard';
import { CircularProgress } from '@mui/material';
import styles from './ScoreboardCarousel.module.css';
import ScoreboardGameCard from './ScoreboardGameCard';

type ScoreboardCarouselComponentProps = {
  date?: string;
  teamAbbrev?: string;
};

export default function ScoreboardCarousel({ date, teamAbbrev }: ScoreboardCarouselComponentProps) {
  const { data: generalScoreboard, isLoading: isGeneralLoading } = useQuery({
    ...scoreboardQuery.get(date),
    enabled: !teamAbbrev,
    select: (data) => data.gamesByDate
  });

  const { data: teamScoreboard, isLoading: isTeamLoading } = useQuery({
    ...scoreboardQuery.getForTeam(teamAbbrev ?? '', date),
    enabled: !!teamAbbrev,
    select: (data) => data.gamesByDate
  });

  const scoreboard = teamAbbrev ? teamScoreboard : generalScoreboard;
  const isScoreboardLoading = teamAbbrev ? isTeamLoading : isGeneralLoading;

  return (
    <>
      {isScoreboardLoading ? (
        <section className={styles.loaderContainer}>
          <CircularProgress size="88px" aria-label="Loading…" />
          <span>Loading scores…</span>
        </section>
      ) : (
        <section className={styles.container}>
          {scoreboard?.flatMap((days) => days.games.map((game) => <ScoreboardGameCard key={game.id} game={game} />)) ??
            []}
        </section>
      )}
    </>
  );
}
