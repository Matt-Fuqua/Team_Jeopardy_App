import React from 'react';
import { Column, Grid, Row } from 'carbon-components-react';
import { Gameboard, PlayerDetails, QuestionModal } from '../components';

const GamePlay = () => {
  return (
    <div>
      <Grid>
        <Row>
          <h1> LETS GET READY TO RUMBLE !!! </h1>
        </Row>
        <Row>
          <Gameboard />
          <QuestionModal /> 
        </Row>
        <Row>
          <Column>
            <PlayerDetails />
          </Column>
          <Column>
            <PlayerDetails />
          </Column>
        </Row>
      </Grid>
    </div>
 
  );
};

export default GamePlay;