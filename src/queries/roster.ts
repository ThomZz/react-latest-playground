import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getRoster } from '../api/roster';

const roster = createQueryKeys('roster', {
  detail: (teamAbbrev: string) => ({
    queryKey: [teamAbbrev],
    queryFn: () => getRoster(teamAbbrev)
  })
});

export default roster;
