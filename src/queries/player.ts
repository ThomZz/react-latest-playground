import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getPlayer } from '../api/player';

const player = createQueryKeys('player', {
  detail: (playerId: string) => ({
    queryKey: [playerId],
    queryFn: () => getPlayer(playerId)
  })
});

export default player;
