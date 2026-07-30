import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import playerQuery from '../queries/player';
import { CircularProgress } from '@mui/material';
import styles from './Player.module.css';
import sharedStyles from '../styles/shared.module.css';
import SkaterStatsTable from '../components/SkaterStatsTable';
import { isSkaterStats } from '../api/models/player';
import GoalieStatsTable from '../components/GoalieStatsTable';

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
            {isSkaterStats(player!) ? <SkaterStatsTable player={player!} /> : <GoalieStatsTable player={player!} />}
          </div>
        </div>
      )}
    </section>
  );
}
