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
import { Link, useSearchParams } from 'react-router-dom';
import playerQuery from '../queries/player';
import sharedStyles from '../styles/shared.module.css';

export default function Player() {
  const [searchParams] = useSearchParams();
  const { data: playerList, isLoading: isPlayerListLoading } = useQuery({
    ...playerQuery.search(searchParams.get('query') || ''),
    enabled: !!searchParams.get('query')
  });

  return (
    <section className={sharedStyles.flexPageContainer}>
      {isPlayerListLoading ? (
        <div className={sharedStyles.fullSizeAbsoluteFlexContainer}>
          <CircularProgress size="106px" aria-label="Loading…" />
          <p>Searching for players …</p>
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
                  <TableCell component="th" scope="row">
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
              {playerList?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No players found
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </section>
  );
}
