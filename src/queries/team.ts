import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getTeams } from '../api/team';

const team = createQueryKeys('team', {
  list: {
    queryKey: null,
    queryFn: () => getTeams()
  }
});

export default team;
