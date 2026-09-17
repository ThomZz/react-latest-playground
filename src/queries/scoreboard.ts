import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getScoreboard, getTeamScoreboard } from '../api/scoreboard';

const scoreboard = createQueryKeys('scoreboard', {
  get: (date: string = 'now') => ({
    queryKey: [date],
    queryFn: () => getScoreboard(date)
  }),
  getForTeam: (teamAbbrev: string, date: string = 'now') => ({
    queryKey: [teamAbbrev, date],
    queryFn: () => getTeamScoreboard(teamAbbrev, date)
  })
});

export default scoreboard;
