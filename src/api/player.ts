import { WEB_API_BASE_URL } from './constants';
import type { GoalieStats, SkaterStats } from './models/player';

export async function getPlayer(id: string): Promise<SkaterStats | GoalieStats> {
  const res = await fetch(`${WEB_API_BASE_URL}/player/${id}/landing`);
  return res.json();
}
