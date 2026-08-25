import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import type { GoalieStats } from '../api/models/player';

type GoalieStatsTableComponentProps = {
  player: GoalieStats;
};

export default function GoalieStatsTable({ player }: GoalieStatsTableComponentProps) {
  const seenSeasons = new Set<string>();
  const seasonTotals = player.seasonTotals.filter((row) => {
    if (seenSeasons.has(`${row.season}:${row.teamName.default}:${row.leagueAbbrev}`)) return false;
    seenSeasons.add(`${row.season}:${row.teamName.default}:${row.leagueAbbrev}`);
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
            <TableCell>GS</TableCell>
            <TableCell>W</TableCell>
            <TableCell>L</TableCell>
            <TableCell>T</TableCell>
            <TableCell>OT</TableCell>
            <TableCell>SA</TableCell>
            <TableCell>GAA</TableCell>
            <TableCell>SV%</TableCell>
            <TableCell>SO</TableCell>
            <TableCell>G</TableCell>
            <TableCell>A</TableCell>
            <TableCell>PIM</TableCell>
            <TableCell>TOI</TableCell>
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
              <TableCell>{row.gamesStarted ?? '--'}</TableCell>
              <TableCell>{row.wins ?? '--'}</TableCell>
              <TableCell>{row.losses ?? '--'}</TableCell>
              <TableCell>{row.ties ?? '--'}</TableCell>
              <TableCell>{row.otLosses ?? '--'}</TableCell>
              <TableCell>{row.shotsAgainst ?? '--'}</TableCell>
              <TableCell>{row.goalsAgainstAvg ? row.goalsAgainstAvg.toFixed(2) : '--'}</TableCell>
              <TableCell>{row.savePctg ? row.savePctg.toFixed(3) : '--'}</TableCell>
              <TableCell>{row.shutouts ?? '--'}</TableCell>
              <TableCell>{row.goals ?? '--'}</TableCell>
              <TableCell>{row.assists ?? '--'}</TableCell>
              <TableCell>{row.pim ?? '--'}</TableCell>
              <TableCell>{row.timeOnIce ?? '--'}</TableCell>
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
              <TableCell>{player!.careerTotals.regularSeason?.gamesStarted ?? '--'}</TableCell>
              <TableCell>{player!.careerTotals.regularSeason?.wins ?? '--'}</TableCell>
              <TableCell>{player!.careerTotals.regularSeason?.losses ?? '--'}</TableCell>
              <TableCell>&nbsp;</TableCell>
              <TableCell>{player!.careerTotals.regularSeason?.otLosses ?? '--'}</TableCell>
              <TableCell>{player!.careerTotals.regularSeason?.shotsAgainst ?? '--'}</TableCell>
              <TableCell>
                {player!.careerTotals.regularSeason?.goalsAgainstAvg
                  ? player.careerTotals.regularSeason.goalsAgainstAvg.toFixed(2)
                  : '--'}
              </TableCell>
              <TableCell>
                {player!.careerTotals.regularSeason?.savePctg
                  ? player.careerTotals.regularSeason.savePctg.toFixed(3)
                  : '--'}
              </TableCell>
              <TableCell>{player!.careerTotals.regularSeason?.shutouts ?? '--'}</TableCell>
              <TableCell>{player!.careerTotals.regularSeason?.goals ?? '--'}</TableCell>
              <TableCell>{player!.careerTotals.regularSeason?.assists ?? '--'}</TableCell>
              <TableCell>{player!.careerTotals.regularSeason?.pim ?? '--'}</TableCell>
              <TableCell>{player!.careerTotals.regularSeason?.timeOnIce ?? '--'}</TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
