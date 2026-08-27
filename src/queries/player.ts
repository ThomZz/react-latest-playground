import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getPlayer, searchPlayers } from '../api/player';

const player = createQueryKeys('player', {
  detail: (playerId: string) => ({
    queryKey: [playerId],
    queryFn: () => getPlayer(playerId)
  }),
  search: (query: string) => ({
    queryKey: [query],
    queryFn: () => searchPlayers(query)
  })
});

export default player;
