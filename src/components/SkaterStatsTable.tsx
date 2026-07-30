import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import type { SkaterStats } from '../api/models/player';

type SkaterStatsTableComponentProps = {
  player: SkaterStats;
};

export default function SkaterStatsTable({ player }: SkaterStatsTableComponentProps) {
  const seenSeasons = new Set<number>();
  const seasonTotals = player.seasonTotals.filter((row) => {
    if (seenSeasons.has(row.season)) return false;
    seenSeasons.add(row.season);
    return true;
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: '100%' }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow sx={{ '& .MuiTableCell-root': { fontSize: '16px' } }}>
            <TableCell>Season</TableCell>
            <TableCell>League</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>GP</TableCell>
            <TableCell>G</TableCell>
            <TableCell>A</TableCell>
            <TableCell>P</TableCell>
            <TableCell>+/-</TableCell>
            <TableCell>PIM</TableCell>
            <TableCell>PPG</TableCell>
            <TableCell>PPP</TableCell>
            <TableCell>SHG</TableCell>
            <TableCell>SHP</TableCell>
            <TableCell>TOI/GP</TableCell>
            <TableCell>GWG</TableCell>
            <TableCell>OTG</TableCell>
            <TableCell>S</TableCell>
            <TableCell>S%</TableCell>
            <TableCell>FOW%</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ fontSize: '16px' }}>
          {seasonTotals.map((row) => (
            <TableRow
              key={row.season + row.sequence}
              sx={{
                backgroundColor: row.leagueAbbrev === 'NHL' ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                '& .MuiTableCell-root': { fontSize: '16px' },
                '&:last-child td, &:last-child th': { border: 0 }
              }}
            >
              <TableCell component="th" scope="row">
                {row.season}
              </TableCell>
              <TableCell>{row.leagueAbbrev}</TableCell>
              <TableCell>{row.teamName.default}</TableCell>
              <TableCell>{row.gamesPlayed ?? '--'}</TableCell>
              <TableCell>{row.goals ?? '--'}</TableCell>
              <TableCell>{row.assists ?? '--'}</TableCell>
              <TableCell>{row.points ?? '--'}</TableCell>
              <TableCell>{row.plusMinus ?? '--'}</TableCell>
              <TableCell>{row.pim ?? '--'}</TableCell>
              <TableCell>{row.powerPlayGoals ?? '--'}</TableCell>
              <TableCell>{row.powerPlayPoints ?? '--'}</TableCell>
              <TableCell>{row.shorthandedGoals ?? '--'}</TableCell>
              <TableCell>{row.shorthandedPoints ?? '--'}</TableCell>
              <TableCell>{row.avgToi ?? '--'}</TableCell>
              <TableCell>{row.gameWinningGoals ?? '--'}</TableCell>
              <TableCell>{row.otGoals ?? '--'}</TableCell>
              <TableCell>{row.shots ?? '--'}</TableCell>
              <TableCell>{row.shootingPctg ? (row.shootingPctg * 100).toFixed(1) : '--'}</TableCell>
              <TableCell>{row.faceoffWinningPctg ? (row.faceoffWinningPctg * 100).toFixed(1) : '--'}</TableCell>
            </TableRow>
          ))}
          {player!.careerTotals ? (
            <TableRow
              sx={{
                '& .MuiTableCell-root': {
                  fontSize: '16px',
                  fontWeight: 'bold',
                  backgroundColor: '#3498db63'
                }
              }}
            >
              <TableCell component="th" scope="row">
                NHL Carreer
              </TableCell>
              <TableCell>&nbsp;</TableCell>
              <TableCell>&nbsp;</TableCell>
              <TableCell>{player!.careerTotals.regularSeason?.gamesPlayed ?? '--'}</TableCell>
              <TableCell>{player!.careerTotals.regularSeason?.goals ?? '--'}</TableCell>
              <TableCell>{player!.careerTotals.regularSeason?.assists ?? '--'}</TableCell>
              <TableCell>{player!.careerTotals.regularSeason?.points ?? '--'}</TableCell>
              <TableCell>{player!.careerTotals.regularSeason?.plusMinus ?? '--'}</TableCell>
              <TableCell>{player!.careerTotals.regularSeason?.pim ?? '--'}</TableCell>
              <TableCell>{player!.careerTotals.regularSeason?.powerPlayGoals ?? '--'}</TableCell>
              <TableCell>{player!.careerTotals.regularSeason?.powerPlayPoints ?? '--'}</TableCell>
              <TableCell>{player!.careerTotals.regularSeason?.shorthandedGoals ?? '--'}</TableCell>
              <TableCell>{player!.careerTotals.regularSeason?.shorthandedPoints ?? '--'}</TableCell>
              <TableCell>{player!.careerTotals.regularSeason?.avgToi ?? '--'}</TableCell>
              <TableCell>{player!.careerTotals.regularSeason?.gameWinningGoals ?? '--'}</TableCell>
              <TableCell>{player!.careerTotals.regularSeason?.otGoals ?? '--'}</TableCell>
              <TableCell>{player!.careerTotals.regularSeason?.shots ?? '--'}</TableCell>
              <TableCell>
                {player!.careerTotals.regularSeason?.shootingPctg
                  ? (player!.careerTotals.regularSeason.shootingPctg * 100).toFixed(1)
                  : '--'}
              </TableCell>
              <TableCell>
                {player!.careerTotals.regularSeason?.faceoffWinningPctg
                  ? (player!.careerTotals.regularSeason.faceoffWinningPctg * 100).toFixed(1)
                  : '--'}
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
