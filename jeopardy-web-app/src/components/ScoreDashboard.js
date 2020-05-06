import React from 'react';
import { useSelector } from 'react-redux';
import { PlayerDetails } from '.';
import { Column, Grid } from 'carbon-components-react';
import { playerOneScore, playerTwoScore, userName } from '../selectors';

const ScoreDashboard = () => {
  const oneName = useSelector(userName);
  const twoName = 'Virtual Player';
  const oneScore = useSelector(playerOneScore);
  const twoScore = useSelector(playerTwoScore);

  return (
    <div>
      <Grid>
        <Column>
          <PlayerDetails name={oneName} score={oneScore} />
        </Column>
        <Column>
          <PlayerDetails name={twoName} score={twoScore} />
        </Column>
      </Grid>
    </div>
  );
};

export default ScoreDashboard;