import { screen } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import ScoreboardCarousel from './ScoreboardCarousel';
import { renderWithDefaultProviders } from '../utils/test';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn()
}));

const mockedUseQuery = jest.mocked(useQuery);

const scoreboardData = [
  {
    date: '2024-10-09',
    games: [
      {
        id: 1,
        season: 2024,
        gameType: 2,
        gameDate: '2024-10-09',
        gameCenterLink: '',
        venue: { default: 'Arena' },
        startTimeUTC: '2024-10-09T19:00:00Z',
        easternUTCOffset: '-04:00',
        venueUTCOffset: '-04:00',
        tvBroadcasts: [],
        gameState: 'PRE',
        gameScheduleState: 'OK',
        awayTeam: {
          id: 1,
          name: { default: 'Away Team' },
          commonName: { default: 'Away' },
          placeNameWithPreposition: { default: 'Away' },
          abbrev: 'AWY',
          record: '1-0',
          logo: 'https://example.com/away.png'
        },
        homeTeam: {
          id: 2,
          name: { default: 'Home Team' },
          commonName: { default: 'Home' },
          placeNameWithPreposition: { default: 'Home' },
          abbrev: 'HOM',
          record: '0-1',
          logo: 'https://example.com/home.png'
        }
      },
      {
        id: 2,
        season: 2024,
        gameType: 2,
        gameDate: '2024-10-09',
        gameCenterLink: '',
        venue: { default: 'Arena 2' },
        startTimeUTC: '2024-10-09T20:00:00Z',
        easternUTCOffset: '-04:00',
        venueUTCOffset: '-04:00',
        tvBroadcasts: [],
        gameState: 'PRE',
        gameScheduleState: 'OK',
        awayTeam: {
          id: 3,
          name: { default: 'Away Team 2' },
          commonName: { default: 'Away 2' },
          placeNameWithPreposition: { default: 'Away 2' },
          abbrev: 'A2',
          record: '2-0',
          logo: 'https://example.com/away2.png'
        },
        homeTeam: {
          id: 4,
          name: { default: 'Home Team 2' },
          commonName: { default: 'Home 2' },
          placeNameWithPreposition: { default: 'Home 2' },
          abbrev: 'H2',
          record: '1-1',
          logo: 'https://example.com/home2.png'
        }
      }
    ]
  },
  {
    date: '2024-10-10',
    games: [
      {
        id: 3,
        season: 2024,
        gameType: 2,
        gameDate: '2024-10-10',
        gameCenterLink: '',
        venue: { default: 'Arena 3' },
        startTimeUTC: '2024-10-10T20:00:00Z',
        easternUTCOffset: '-04:00',
        venueUTCOffset: '-04:00',
        tvBroadcasts: [],
        gameState: 'PRE',
        gameScheduleState: 'OK',
        awayTeam: {
          id: 5,
          name: { default: 'Away Team 3' },
          commonName: { default: 'Away 3' },
          placeNameWithPreposition: { default: 'Away 3' },
          abbrev: 'A3',
          record: '3-0',
          logo: 'https://example.com/away3.png'
        },
        homeTeam: {
          id: 6,
          name: { default: 'Home Team 3' },
          commonName: { default: 'Home 3' },
          placeNameWithPreposition: { default: 'Home 3' },
          abbrev: 'H3',
          record: '2-1',
          logo: 'https://example.com/home3.png'
        }
      }
    ]
  }
];

describe('ScoreboardCarousel', () => {
  beforeEach(() => {
    mockedUseQuery.mockImplementation(
      () =>
        ({
          data: scoreboardData,
          isLoading: false
        }) as unknown as ReturnType<typeof useQuery>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders a label only for multi-game dates', () => {
    renderWithDefaultProviders(<ScoreboardCarousel />);

    const groupedLabel = new Intl.DateTimeFormat(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC'
    }).format(new Date('2024-10-09T00:00:00Z'));

    const singleGameLabel = new Intl.DateTimeFormat(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC'
    }).format(new Date('2024-10-10T00:00:00Z'));

    expect(screen.getByText(groupedLabel)).toBeInTheDocument();
    expect(screen.queryByText(singleGameLabel)).not.toBeInTheDocument();
  });
});
