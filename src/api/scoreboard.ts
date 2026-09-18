import type { Scoreboard } from './models/scoreboard';
import { WEB_API_BASE_URL } from './constants';

export async function getScoreboard(date: string = 'now'): Promise<Scoreboard> {
  const res = await fetch(`${WEB_API_BASE_URL}/scoreboard/${date ? date : 'now'}`);
  const data = (await res.json()) as Scoreboard;
  return fromDto(data);
}

export async function getTeamScoreboard(teamAbbrev: string, date: string = 'now'): Promise<Scoreboard> {
  const res = await fetch(`${WEB_API_BASE_URL}/scoreboard/${teamAbbrev}/${date ? date : 'now'}`);
  const data = (await res.json()) as Scoreboard;
  return fromDto(data);
}

function fromDto(scoreboard: Scoreboard): Scoreboard {
  return {
    ...scoreboard,
    gamesByDate: scoreboard.gamesByDate.map((day) => ({
      ...day,
      games: day.games.map((game) => ({
        ...game,
        homeTeam: {
          ...game.homeTeam,
          logo: game.homeTeam.logo.replace('_light', '_dark')
        },
        awayTeam: {
          ...game.awayTeam,
          logo: game.awayTeam.logo.replace('_light', '_dark')
        }
      }))
    }))
  };
}
