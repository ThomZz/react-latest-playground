import type { LocalizedName } from './player';

interface TvBroadcastLogoUrls {
  light: string;
  dark: string;
}

interface TvBroadcast {
  id: number;
  market: string;
  countryCode: string;
  network: string;
  sequenceNumber: number;
  logoUrls?: TvBroadcastLogoUrls;
}

interface PeriodDescriptor {
  number: number;
  periodType: string;
  maxRegulationPeriods: number;
}

interface ScoreboardTeam {
  id: number;
  name: LocalizedName;
  commonName: LocalizedName;
  placeNameWithPreposition: LocalizedName;
  abbrev: string;
  record?: string;
  score?: number;
  logo: string;
}

export interface ScoreboardGame {
  id: number;
  season: number;
  gameType: number;
  gameDate: string;
  gameCenterLink: string;
  venue: LocalizedName;
  startTimeUTC: string;
  easternUTCOffset: string;
  venueUTCOffset: string;
  tvBroadcasts: TvBroadcast[];
  gameState: string;
  gameScheduleState: string;
  awayTeam: ScoreboardTeam;
  homeTeam: ScoreboardTeam;
  period?: number;
  periodDescriptor?: PeriodDescriptor;
  ticketsLink?: string;
  ticketsLinkFr?: string;
  threeMinRecap?: string;
  threeMinRecapFr?: string;
}

export interface ScoreboardDay {
  date: string;
  games: ScoreboardGame[];
}

export interface Scoreboard {
  focusedDate: string;
  focusedDateCount: number;
  gamesByDate: ScoreboardDay[];
}
