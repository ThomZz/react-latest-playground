import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ASSETS_BASE_URL } from '../api/constants';
import playerQuery from '../queries/player';
import sharedStyles from '../styles/shared.module.css';

export default function Player() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: playerList, isLoading: isPlayerListLoading } = useQuery({
    ...playerQuery.search(searchParams.get('query') || ''),
    select: (data) => data.sort((a, b) => a.name.localeCompare(b.name)),
    enabled: !!searchParams.get('query')
  });

  useEffect(() => {
    if (playerList?.length === 1) {
      navigate(`/player/${playerList[0].playerId}`, { replace: true });
    }
  }, [navigate, playerList]);

  return (
    <section className={sharedStyles.flexPageContainer}>
      {isPlayerListLoading || playerList?.length === 1 ? (
        <div className={sharedStyles.fullSizeAbsoluteFlexContainer}>
          <CircularProgress size="106px" aria-label="Loading…" />
          <p>{isPlayerListLoading ? 'Searching for players …' : 'Opening player …'}</p>
        </div>
      ) : playerList?.length === 0 ? (
        <div className={sharedStyles.fullSizeAbsoluteFlexContainer}>
          <p>No players found</p>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ width: '100%' }} size="small" aria-label="player search results">
            <TableHead>
              <TableRow sx={{ '& .MuiTableCell-root': { fontSize: '16px' } }}>
                <TableCell>Name</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Team</TableCell>
                <TableCell>Jersey Number</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Height</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Birthplace</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ fontSize: '16px' }}>
              {playerList?.map((player) => (
                <TableRow
                  key={player.playerId}
                  sx={{
                    '& .MuiTableCell-root': { fontSize: '16px' },
                    '&:last-child td, &:last-child th': { border: 0 }
                  }}
                >
                  <TableCell component="th" scope="row" sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img
                      src={`${ASSETS_BASE_URL}/mugs/nhl/latest/${player.playerId}.png`}
                      alt=""
                      width="48"
                      height="48"
                      style={{ borderRadius: '50%', objectFit: 'contain' }}
                    />
                    <Link to={`/player/${player.playerId}`}>{player.name}</Link>
                  </TableCell>
                  <TableCell>{player.positionCode}</TableCell>
                  <TableCell>{player.teamAbbrev ?? player.lastTeamAbbrev ?? '--'}</TableCell>
                  <TableCell>{player.sweaterNumber ?? '--'}</TableCell>
                  <TableCell>{player.active ? 'Active' : 'Inactive'}</TableCell>
                  <TableCell>{player.height ?? '--'}</TableCell>
                  <TableCell>{player.weightInPounds != null ? `${player.weightInPounds} lb` : '--'}</TableCell>
                  <TableCell>
                    {[player.birthCity, player.birthStateProvince, player.birthCountry].filter(Boolean).join(', ')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </section>
  );
}
