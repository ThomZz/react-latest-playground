import { useQuery, useQueryClient } from '@tanstack/react-query';
import rosterQuery from '../queries/roster';
import teamQuery from '../queries/team';
import styles from './Team.module.css';
import sharedStyles from '../styles/shared.module.css';
import { type Team } from '../api/models/team';
import { CircularProgress, Skeleton } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

export default function Team() {
  const queryClient = useQueryClient();
  const routeParams = useParams();
  const { data: team, isLoading: isTeamLoading } = useQuery({
    ...teamQuery.detail(routeParams.id!),
    enabled: !!routeParams.id,
    initialData: () => {
      return queryClient
        .getQueryData<Team[]>(teamQuery.list.queryKey)
        ?.find((d) => d.abbrev.default === routeParams.id);
    },
    initialDataUpdatedAt: () => {
      return queryClient.getQueryState(teamQuery.list.queryKey)?.dataUpdatedAt;
    }
  });
  const { data: roster, isLoading: isRosterLoading } = useQuery({
    ...rosterQuery.detail(routeParams.id!),
    enabled: !!routeParams.id
  });
  const forwards = roster?.forwards ?? [];
  const defensemen = roster?.defensemen ?? [];
  const goalies = roster?.goalies ?? [];

  return (
    <section className={sharedStyles.flexPageContainer}>
      <div className={styles.teamHeader}>
        {isTeamLoading ? (
          <>
            <Skeleton height={48} width="200px" />
            <Skeleton variant="circular" width="9rem" height="9rem" />
          </>
        ) : (
          <>
            <h1>{team?.name.default}</h1>
            <img className={styles.teamLogo} src={team?.logoDark} alt={team?.commonName.default} />
          </>
        )}
      </div>
      {isRosterLoading ? (
        <div className={sharedStyles.fullSizeAbsoluteFlexContainer}>
          <CircularProgress size="106px" aria-label="Loading…" />
          <p>Loading roster…</p>
        </div>
      ) : (
        <div className={styles.rosterContainer}>
          {forwards.map((player) => (
            <Link key={player.id} className={styles.playerCard} to={`./player/${player.id}`}>
              <img
                className={styles.logo}
                src={player.headshot}
                alt={`${player.firstName.default} ${player.lastName.default}`}
              />
              <p className={styles.name}>
                {player.firstName.default} {player.lastName.default}
              </p>
            </Link>
          ))}
          {defensemen.map((player) => (
            <Link key={player.id} className={styles.playerCard} to={`./player/${player.id}`}>
              <img
                className={styles.logo}
                src={player.headshot}
                alt={`${player.firstName.default} ${player.lastName.default}`}
              />
              <p className={styles.name}>
                {player.firstName.default} {player.lastName.default}
              </p>
            </Link>
          ))}
          {goalies.map((player) => (
            <Link key={player.id} className={styles.playerCard} to={`./player/${player.id}`}>
              <img
                className={styles.logo}
                src={player.headshot}
                alt={`${player.firstName.default} ${player.lastName.default}`}
              />
              <p className={styles.name}>
                {player.firstName.default} {player.lastName.default}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
