export interface LocalizedName {
  default: string;
  [locale: string]: string | undefined;
}

export type PositionCode = 'C' | 'L' | 'R' | 'D' | 'G';
export type Handedness = 'L' | 'R';

export interface PlayerSearchResult {
  playerId: string;
  name: string;
  positionCode: PositionCode;
  teamId: string | null;
  teamAbbrev: string | null;
  lastTeamId: string | null;
  lastTeamAbbrev: string | null;
  lastSeasonId: string | null;
  sweaterNumber: number | null;
  active: boolean;
  height: string | null;
  heightInInches: number | null;
  heightInCentimeters: number | null;
  weightInPounds: number | null;
  weightInKilograms: number | null;
  birthCity: string;
  birthStateProvince: string | null;
  birthCountry: string;
}

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

export interface DraftDetails {
  year: number;
  teamAbbrev: string;
  round: number;
  pickInRound: number;
  overallPick: number;
}

export interface StatLine {
  assists: number;
  gameWinningGoals: number;
  gamesPlayed: number;
  goals: number;
  otGoals: number;
  pim: number;
  plusMinus: number;
  points: number;
  powerPlayGoals: number;
  powerPlayPoints: number;
  shootingPctg: number;
  shorthandedGoals: number;
  shorthandedPoints: number;
  shots: number;
}

export interface TotalsStatLine extends StatLine {
  avgToi: string;
  faceoffWinningPctg: number;
}

export interface FeaturedStats {
  season: number;
  regularSeason: {
    subSeason: StatLine;
    career: StatLine;
  };
  playoffs: {
    subSeason: StatLine;
    career: StatLine;
  };
}

export interface CareerTotals {
  regularSeason: TotalsStatLine;
  playoffs: TotalsStatLine;
}

export interface GameLog {
  assists: number;
  gameDate: string;
  gameId: number;
  gameTypeId: number;
  goals: number;
  homeRoadFlag: 'H' | 'R';
  opponentAbbrev: string;
  pim: number;
  plusMinus: number;
  points: number;
  powerPlayGoals: number;
  shifts: number;
  shorthandedGoals: number;
  shots: number;
  teamAbbrev: string;
  toi: string;
}

export interface SeasonTotal {
  gameTypeId: number;
  season: number;
  sequence: number;
  teamName: LocalizedName;
  leagueAbbrev?: string;
  gamesPlayed?: number;
  goals?: number;
  assists?: number;
  points?: number;
  pim?: number;
  plusMinus?: number;
  gameWinningGoals?: number;
  otGoals?: number;
  powerPlayGoals?: number;
  powerPlayPoints?: number;
  shorthandedGoals?: number;
  shorthandedPoints?: number;
  shots?: number;
  shootingPctg?: number;
  avgToi?: string;
  faceoffWinningPctg?: number;
  teamCommonName?: LocalizedName;
  teamPlaceNameWithPreposition?: LocalizedName;
}

export interface AwardSeason {
  assists: number;
  blockedShots: number;
  gameTypeId: number;
  gamesPlayed: number;
  goals: number;
  hits: number;
  pim: number;
  plusMinus: number;
  points: number;
  seasonId: number;
}

export interface Award {
  trophy: LocalizedName;
  seasons: AwardSeason[];
}

// --- Goalie stats ---
// Goalies use a different stat shape than skaters (save %, GAA, wins/losses,
// shutouts instead of goals/assists/points).

export interface GoalieStatLine {
  gamesPlayed: number;
  goalsAgainstAvg: number;
  losses: number;
  otLosses: number;
  savePctg: number;
  shutouts: number;
  wins: number;
}

export interface GoalieFeaturedStats {
  season: number;
  regularSeason: {
    subSeason: GoalieStatLine;
    career: GoalieStatLine;
  };
  playoffs?: {
    subSeason: GoalieStatLine;
    career: GoalieStatLine;
  };
}

export interface GoalieTotalsStatLine {
  assists: number;
  gamesPlayed: number;
  gamesStarted: number;
  goals: number;
  goalsAgainst: number;
  goalsAgainstAvg: number;
  losses: number;
  otLosses: number;
  pim: number;
  savePctg: number;
  shotsAgainst: number;
  shutouts: number;
  timeOnIce: string;
  wins: number;
}

export interface GoalieCareerTotals {
  regularSeason: GoalieTotalsStatLine;
  playoffs: GoalieTotalsStatLine;
}

export interface GoalieGameLog {
  decision: 'W' | 'L' | 'O';
  gameDate: string;
  gameId: number;
  gameTypeId: number;
  gamesStarted: number;
  goalsAgainst: number;
  homeRoadFlag: 'H' | 'R';
  opponentAbbrev: string;
  penaltyMins: number;
  savePctg: number;
  shotsAgainst: number;
  teamAbbrev: string;
  toi: string;
}

export interface GoalieSeasonTotal {
  gameTypeId: number;
  season: number;
  sequence: number;
  teamName: LocalizedName;
  leagueAbbrev?: string;
  gamesPlayed?: number;
  gamesStarted?: number;
  goalsAgainst?: number;
  goalsAgainstAvg?: number;
  savePctg?: number;
  shotsAgainst?: number;
  shutouts?: number;
  wins?: number;
  losses?: number;
  otLosses?: number;
  ties?: number;
  timeOnIce?: string;
  assists?: number;
  goals?: number;
  pim?: number;
  teamCommonName?: LocalizedName;
  teamPlaceNameWithPreposition?: LocalizedName;
}

// --- Player landing payload ---
// Bio fields are common to skaters and goalies; the stat blocks differ.

export interface PlayerStats {
  playerId: number;
  isActive: boolean;
  currentTeamId: number;
  currentTeamAbbrev: string;
  fullTeamName: LocalizedName;
  teamCommonName: LocalizedName;
  teamPlaceNameWithPreposition: LocalizedName;
  firstName: LocalizedName;
  lastName: LocalizedName;
  badges: unknown[];
  teamLogo: string;
  sweaterNumber: number;
  position: PositionCode;
  headshot: string;
  heroImage: string;
  heightInInches: number;
  heightInCentimeters: number;
  weightInPounds: number;
  weightInKilograms: number;
  birthDate: string;
  birthCity: LocalizedName;
  birthStateProvince?: LocalizedName;
  birthCountry: string;
  shootsCatches: Handedness;
  draftDetails?: DraftDetails;
  playerSlug: string;
  inTop100AllTime: number;
  inHHOF: number;
  shopLink: string;
  twitterLink: string;
  watchLink: string;
  awards?: Award[];
}

export function isSkaterStats(stats: PlayerStats): stats is SkaterStats {
  return stats.position !== 'G';
}

export interface SkaterStats extends PlayerStats {
  featuredStats: FeaturedStats;
  careerTotals: CareerTotals;
  last5Games: GameLog[];
  seasonTotals: SeasonTotal[];
}

export interface GoalieStats extends PlayerStats {
  position: 'G';
  featuredStats: GoalieFeaturedStats;
  careerTotals: GoalieCareerTotals;
  last5Games: GoalieGameLog[];
  seasonTotals: GoalieSeasonTotal[];
}
