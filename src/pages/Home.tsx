import { useQuery } from '@tanstack/react-query';
import teamQuery from '../queries/team';
import styles from './Home.module.css';
import sharedStyles from '../styles/shared.module.css';
import TeamCard from '../components/TeamCard';
import TextField from '@mui/material/TextField';
import { useMemo, useState } from 'react';
import { Autocomplete, CircularProgress } from '@mui/material';

export default function Home() {
  const { data: teams, isLoading: areTeamsLoading } = useQuery(teamQuery.list);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [teamFilterInputValue, setTeamFilterInputValue] = useState<string>('');
  const filteredTeams = useMemo(() => {
    if (!teams) return [];
    return teams.filter((team) => team.name.default.toLowerCase().includes(teamFilterInputValue.toLowerCase()));
  }, [teams, teamFilterInputValue]);

  return (
    <section className={sharedStyles.flexPageContainer}>
      {areTeamsLoading ? (
        <div className={sharedStyles.fullSizeAbsoluteFlexContainer}>
          <CircularProgress size="106px" aria-label="Loading…" />
          <p>Loading teams…</p>
        </div>
      ) : (
        <>
          <Autocomplete
            disablePortal
            disabled={areTeamsLoading}
            clearOnBlur={false}
            options={teams?.map((team) => team.name.default) ?? []}
            value={selectedTeam}
            onChange={(_, newValue: string | null) => {
              setSelectedTeam(newValue);
            }}
            inputValue={teamFilterInputValue}
            onInputChange={(_, newInputValue) => {
              setTeamFilterInputValue(newInputValue);
            }}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Team" />}
          />
          <div className={styles.teamsContainer}>
            {filteredTeams.map((team) => (
              <TeamCard key={team.name.default} team={team} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
