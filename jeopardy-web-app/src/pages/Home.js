import React from 'react';
import { Column, Grid, Row } from 'carbon-components-react';
import { NewUser, UserLogin } from '../components';

const Home = () => {
  return (
  
     <div>
        <Grid>
          <Row style={{ padding: "50px" }}>
            <Column>
              <h1 style={{ color: "blue" }}> Welcome to online Jeopardy </h1><br></br>
              <p style={{ fontSize: "30px" }}> 
                If you are a returning player, please login. <br></br><br></br>
                If this is your first time, you will need to create a user profile. <br></br><br></br>
                This will allow you to track your progress and stats.
              </p>   
            </Column>
            <Column>
              <UserLogin />
            </Column>
          </Row>
          <Row style={{ padding: "10px" }}>
            <Column>
            </Column>
            <Column>
              <NewUser />
            </Column>
          </Row>
        </Grid>
      </div>
  );
};

export default Home;