import React from 'react';
import { useDispatch } from 'react-redux';

import { Button, Column, Grid, Row } from 'carbon-components-react';
import { Gameboard, /* PlayerDetails, */ QuestionModal } from '../components';

import { newGameThunkAction } from '../actions/newGame';

const GamePlay = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <Grid>
        <Row>
          <Column style={{ padding: "30px" }}>
            <h1> Welcome to Jeopardy! </h1>
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
          <QuestionModal /> 
        </Row>
        <Row>
          <Column>
            {/* <PlayerDetails /> */}
          </Column>
          <Column>
            {/* <PlayerDetails /> */}
          </Column>
        </Row>
      </Grid>
    </div>
 
  );
};

export default GamePlay;