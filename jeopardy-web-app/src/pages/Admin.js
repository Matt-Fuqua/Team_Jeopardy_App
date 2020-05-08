import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Column, Grid, Row } from 'carbon-components-react';

import { deleteGamesThunkAction } from '../actions/deleteGames';
import { retrieveGamesThunkAction } from '../actions/retrieveGames';
import { GamesTable } from '../components';


const Admin = () => {
  const dispatch = useDispatch();

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
        </Row>
        <Row>
          <Column>
            <GamesTable />
          </Column>
        </Row>
      </Grid>
    </div>
  );
};

export default Admin;