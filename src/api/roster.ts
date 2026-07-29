export interface LocalizedName {
  default: string;
  [locale: string]: string | undefined;
}

export type PositionCode = 'C' | 'L' | 'R' | 'D' | 'G';
export type Handedness = 'L' | 'R';

export interface Player {
  id: number;
  headshot: string;
  firstName: LocalizedName;
  lastName: LocalizedName;
  sweaterNumber?: number;
  positionCode: PositionCode;
  shootsCatches: Handedness;
  heightInInches: number;
  weightInPounds: number;
  heightInCentimeters: number;
  weightInKilograms: number;
  birthDate: string;
  birthCity: LocalizedName;
  birthCountry: string;
  birthStateProvince?: LocalizedName;
}

export interface Roster {
  forwards: Player[];
  defensemen: Player[];
  goalies: Player[];
}

export async function getRoster(teamAbbrev: string): Promise<Roster> {
  const res = await fetch(
    `https://nhl-api-proxy.onrender.com/v1/roster/${teamAbbrev}/current`
  );
  return res.json();
}
