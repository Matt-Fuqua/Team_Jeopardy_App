import React from 'react';
import { Column, Grid, Row } from 'carbon-components-react';
import { NewUser, UserLogin } from '../components';
import JeopardyLogo from "../images/homePageImage.jpg";

const Home = () => {
  return (
  
     <div>
        <Grid>
          <Row>
          <Column style={{ font: "5px" }}>
            <Row style={{ padding: "10px" }}>
           
              <h1 style={{ color: "blue" }}> Welcome to online Jeopardy </h1>
            </Row>
            <Row>
              <p> 
                If you are a returning player, please login. 
              </p>
            </Row>
            <Row>
              <p>
                If this is your first time, you will need to create a user profile.
              </p>
              </Row>
              <Row>
                <p>
                  This will allow you to track your progress and stats.
                </p>
              </Row> 
              <Row style={{ padding: "20px" }}>
                <img alt="Jeopardy Logo" src={JeopardyLogo} style={{ height: 300, width: 500 }} />
              </Row>             
          </Column>

          <Column>
            <Row style={{ padding: "10px" }}>
              <UserLogin />
            </Row>
            <Row style={{ padding: "10px" }}>
              <NewUser />
            </Row>
          </Column>
          </Row>
        </Grid>
      </div>
  );
};

export default Home;