import type { Player } from './player';

export interface Roster {
  forwards: Player[];
  defensemen: Player[];
  goalies: Player[];
}
