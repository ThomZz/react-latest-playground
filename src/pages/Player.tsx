import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import playerQuery from '../queries/player';
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
import styles from './Player.module.css';
import sharedStyles from '../styles/shared.module.css';

function ordinal(n: number): string {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) {
    return `${n}th`;
  }
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}

function formatHeight(totalInches: number): string {
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return `${feet}' ${inches}"`;
}

function calculateAge(birthDate: string): number {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export default function Player() {
  const routeParams = useParams();
  const { data: player, isLoading: isPlayerLoading } = useQuery({
    ...playerQuery.detail(routeParams.playerId!),
    enabled: !!routeParams.playerId
  });
  return (
    <section className={sharedStyles.flexPageContainer}>
      {isPlayerLoading ? (
        <div className={sharedStyles.fullSizeAbsoluteFlexContainer}>
          <CircularProgress size="106px" aria-label="Loading…" />
          <p>Loading player stats…</p>
        </div>
      ) : (
        <div className={styles.playerContainer}>
          <div className={styles.playerInfosContainer}>
            <div
              className={styles.playerPhoto}
              style={{ backgroundImage: `url(${player?.heroImage})` }}
              role="img"
              aria-label={`${player?.firstName.default} ${player?.lastName.default}`}
            />
            <div className={styles.playerInfos}>
              <div className={styles.playerHeader}>
                <h1>
                  {player?.firstName.default} {player?.lastName.default}
                </h1>
                <h1>{player?.sweaterNumber ? `#${player?.sweaterNumber}` : ''}</h1>
                <h1>{player?.position}</h1>
                <img
                  className={styles.teamLogo}
                  src={`https://assets.nhle.com/logos/nhl/svg/${player!.currentTeamAbbrev}_dark.svg`}
                  width="72"
                  height="64"
                  title={`${player?.fullTeamName.default}`}
                />
              </div>
              <div className={styles.playerSummary}>
                <div className={styles.playerCard}>
                  <img src={player?.headshot} className={styles.playerAvatar} width="150" height="150" />
                  <div className={styles.playerDetails}>
                    <div>
                      <b>Height: </b>
                      {player?.heightInInches != null && formatHeight(player.heightInInches)}
                    </div>
                    <div>
                      <b>Weight: </b>
                      {player?.weightInPounds} lbs
                    </div>
                    <div>
                      <b>Born: </b>
                      {player?.birthDate} (Age: {calculateAge(player?.birthDate ?? '')})
                    </div>
                    <div>
                      <b>Birthplace: </b>
                      {player?.birthCity.default}, {player?.birthCountry}
                    </div>
                    <div>
                      <b>Shoots:</b> {player?.shootsCatches}
                    </div>
                    <div>
                      <b>Draft:</b>{' '}
                      {player?.draftDetails ? (
                        <>
                          {player.draftDetails.year}, {player.draftDetails.teamAbbrev} (
                          {ordinal(player.draftDetails.overallPick)} overall), {ordinal(player.draftDetails.round)}{' '}
                          round, {ordinal(player.draftDetails.pickInRound)} pick
                        </>
                      ) : (
                        'Not drafted'
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.statsContainer}>
            <h1 style={{ margin: 0, padding: '1rem 0.5rem 0 1rem' }}>Carreer Stats</h1>
            <hr style={{ border: '1px solid #444', margin: '1rem' }} />
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
                  {player!.seasonTotals.map((row) => (
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
          </div>
        </div>
      )}
    </section>
  );
}
