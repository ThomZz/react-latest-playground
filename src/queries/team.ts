import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getTeam, getTeams } from '../api/team';

const team = createQueryKeys('team', {
  list: {
    queryKey: null,
    queryFn: () => getTeams()
  },
  detail: (teamAbbrev: string) => ({
    queryKey: [teamAbbrev],
    queryFn: () => getTeam(teamAbbrev)
  })
});

export default team;
