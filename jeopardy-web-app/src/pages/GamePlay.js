import React from 'react';
import { useDispatch } from 'react-redux';

import { Button, Column, Grid, Row } from 'carbon-components-react';
import { Gameboard, QuestionModal, ScoreDashboard } from '../components';

import { newGameThunkAction } from '../actions/newGame';

const GamePlay = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <Grid>
        <Row>
          <Column style={{ padding: "30px" }}>
            <h1 style={{ fontWeight: 'bold' }}> Welcome to Jeopardy! </h1>
          </Column>
          <Column>
            <Button 
              disabled={false}
              iconDescription="medium button"
              kind="primary"
              onClick={() => dispatch(newGameThunkAction())} 
              size="default"
              type="button"
            >
              Start Game
            </Button>
          </Column>
        </Row>
        <Row>
          <Gameboard />
          <ScoreDashboard />
          <QuestionModal /> 
        </Row>
      </Grid>
    </div>
 
  );
};

export default GamePlay;