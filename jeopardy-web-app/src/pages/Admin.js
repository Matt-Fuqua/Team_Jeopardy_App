import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Grid, Row } from 'carbon-components-react';

import { retrieveGamesThunkAction } from '../actions/retrieveGames';
import { deleteGamesThunkAction } from '../actions/deleteGames';
import { GamesTable } from '../components';


const Admin = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Admin Page</h2>
      <Grid>
        <Row style={{ padding: "10px" }}>
          <Button
            kind="primary"
            type="submit"
            onClick={() => dispatch(retrieveGamesThunkAction())} 
          >
          Display Games
        </Button>
        </Row>
        <Row style={{ padding: "10px" }}>
          <Button
            kind="primary"
            type="submit"
            onClick={() => dispatch(deleteGamesThunkAction())} 
          >
          Delete Games
        </Button>
        </Row>
        <Row>
          <GamesTable />
        </Row>
      </Grid>
    </div>
  );
};

export default Admin;