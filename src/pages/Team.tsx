import { useQuery, useQueryClient } from '@tanstack/react-query';
import rosterQuery from '../queries/roster';
import teamQuery from '../queries/team';
import styles from './Team.module.css';
import sharedStyles from '../styles/shared.module.css';
import { type Team } from '../api/models/team';
import { Autocomplete, CircularProgress, Skeleton, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import RosterPlayerCard from '../components/RosterPlayerCard';
import type { Player } from '../api/models/player';
import { useMemo, useState } from 'react';

export default function Team() {
  const queryClient = useQueryClient();
  const routeParams = useParams();
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [playerFilterInputValue, setPlayerFilterInputValue] = useState<string>('');
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
  const filteredPlayers = useMemo<Player[]>(
    () =>
      [...(roster?.forwards ?? []), ...(roster?.defensemen ?? []), ...(roster?.goalies ?? [])].filter((player) =>
        `${player.firstName.default} ${player.lastName.default}`
          .toLowerCase()
          .includes(playerFilterInputValue.toLowerCase())
      ),
    [roster, playerFilterInputValue]
  );

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
        <>
          <Autocomplete
            disablePortal
            clearOnBlur={false}
            options={filteredPlayers?.map((player) => `${player.firstName.default} ${player.lastName.default}`) ?? []}
            value={selectedPlayer}
            onChange={(_, newValue: string | null) => {
              setSelectedPlayer(newValue);
            }}
            inputValue={playerFilterInputValue}
            onInputChange={(_, newInputValue) => {
              setPlayerFilterInputValue(newInputValue);
            }}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Player" />}
          />
          <div className={styles.rosterContainer}>
            {filteredPlayers.map((player) => (
              <RosterPlayerCard key={player.id} player={player} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
