import type { Scoreboard } from './models/scoreboard';
import { WEB_API_BASE_URL } from './constants';

export async function getScoreboard(date: string = 'now'): Promise<Scoreboard> {
  const res = await fetch(`${WEB_API_BASE_URL}/scoreboard/${date ? date : 'now'}`);
  return await res.json();
}

export async function getTeamScoreboard(teamAbbrev: string, date: string = 'now'): Promise<Scoreboard> {
  const res = await fetch(`${WEB_API_BASE_URL}/scoreboard/${teamAbbrev}/${date ? date : 'now'}`);
  return await res.json();
}
