import React from 'react';
import { Grid, Row } from 'carbon-components-react';
import { NewUser, UserLogin } from '../components';

const Home = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Grid>
        <Row style={{ padding: "10px" }}>
          <UserLogin />
        </Row>
        <Row style={{ padding: "10px" }}>
          <NewUser />
        </Row>
      </Grid>
    </div>
  );
};

export default Home;