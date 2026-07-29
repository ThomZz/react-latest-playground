export interface LocalizedString {
  default: string;
  fr?: string;
}

export interface Team {
  name: LocalizedString;
  commonName: LocalizedString;
  abbrev: LocalizedString;
  logo: string;
  logoDark: string;
}

export async function getTeams(): Promise<Team[]> {
  const res = await fetch(
    'https://nhl-api-proxy.onrender.com/v1/standings/now'
  );
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
