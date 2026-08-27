import { SEARCH_API_BASE_URL, WEB_API_BASE_URL } from './constants';
import type { GoalieStats, PlayerSearchResult, SkaterStats } from './models/player';

export async function getPlayer(id: string): Promise<SkaterStats | GoalieStats> {
  const res = await fetch(`${WEB_API_BASE_URL}/player/${id}/landing`);
  return res.json();
}

export async function searchPlayers(query: string): Promise<PlayerSearchResult[]> {
  const res = await fetch(`${SEARCH_API_BASE_URL}&q=${encodeURIComponent(query)}`);
  return res.json();
}
