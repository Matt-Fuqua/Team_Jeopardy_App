import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Column, Form, FormGroup, Grid, Row, TextInput } from 'carbon-components-react';

import { deleteGamesThunkAction } from '../actions/deleteGames';
import { retrieveGamesThunkAction } from '../actions/retrieveGames';
import { simEndGameThunkAction } from '../actions/simEndGame';

import { GamesTable } from '../components';


const Admin = () => {
  const dispatch = useDispatch();

  const [gameID, setGameID] = useState("");
  //const loginResponse = useSelector(loginStatus);

  const handleFormSubmit = e => {
    e.preventDefault();
    dispatch(simEndGameThunkAction(gameID));
    setGameID("");
  };

  return (
    <div>
      <h2>Admin Page</h2>
      <Grid>
        <Row>
          <Column style={{ padding: "10px" }}>
            <Button
                kind="primary"
                type="submit"
                onClick={() => dispatch(retrieveGamesThunkAction())} 
            >
              Display Games
            </Button>
          </Column>
          <Column style={{ padding: "10px" }}>
            <Button
                kind="primary"
                type="submit"
                onClick={() => dispatch(deleteGamesThunkAction())} 
            >
              Delete Games
            </Button>
          </Column>
          <Column style={{ padding: "10px" }}>
            <Form
              onSubmit={handleFormSubmit}
            >
              <TextInput
                id="game-select"
                invalid={false}
                invalidText="A valid value is required"
                labelText="GameId"
                light={true}
                type="text"
                value={gameID}
                onChange={e => setGameID(e.target.value)}
              />
              <Button 
                kind="primary"
                type="submit"
              >
              Sim Game Ending
              </Button>
            </Form>
          </Column>
        </Row>
        <Row>
          <GamesTable />
        </Row>
      </Grid>
    </div>
  );
};

export default Admin;