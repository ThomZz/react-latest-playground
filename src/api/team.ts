import { WEB_API_BASE_URL, STATS_API_BASE_URL, teamAbbrevToIdMap, ASSETS_BASE_URL } from './constants';
import type { Team } from './models/team';

export async function getTeams(): Promise<Team[]> {
  const res = await fetch(`${WEB_API_BASE_URL}/standings/now`);
  const result = await res.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return result.standings.map((team: any) => ({
    name: team.teamName,
    commonName: team.teamCommonName,
    abbrev: team.teamAbbrev,
    logo: team.teamLogo,
    logoDark: team.teamLogoDark
  }));
}

export async function getTeam(teamAbbrev: string): Promise<Team> {
  const teamId = teamAbbrevToIdMap[teamAbbrev];
  const res = await fetch(`${STATS_API_BASE_URL}/en/team/id/${teamId}`);
  const [result] = (await res.json()).data ?? [];
  return {
    name: { default: result.fullName },
    commonName: { default: result.fullName },
    abbrev: { default: result.triCode },
    logo: `${ASSETS_BASE_URL}/logos/nhl/svg/${result.triCode}_light.svg`,
    logoDark: `${ASSETS_BASE_URL}/logos/nhl/svg/${result.triCode}_dark.svg`
  };
}
