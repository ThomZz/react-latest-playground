import { WEB_API_BASE_URL } from './constants';
import type { Roster } from './models/roster';

export async function getRoster(teamAbbrev: string): Promise<Roster> {
  const res = await fetch(`${WEB_API_BASE_URL}/roster/${teamAbbrev}/current`);
  return res.json();
}
