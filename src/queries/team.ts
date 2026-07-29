import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getTeams } from '../api/team';

const teams = createQueryKeys('team', {
  list: {
    queryKey: null,
    queryFn: () => getTeams()
  }
});

export default teams;
