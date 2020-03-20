import React from 'react';
import { useDispatch } from 'react-redux';

import { registerUserThunkAction } from '../actions/registerUser';
import { Button, Column, Grid, Row, TextInput } from 'carbon-components-react';

const NewUser = () => {
  const dispatch = useDispatch();

  // TODO: Instead of coding these values in we want to use the data from the input values below
  const username = 'mjordan';
  const password = 'pw';
  const email = 'mjordan@email.com';
  const firstName = 'Michael';
  const lastName = 'Jordan';

  const registerUserSubmit = () => {
    dispatch(registerUserThunkAction(username, password, email, firstName, lastName));
  }

  return (
    <div style={{ backgroundColor: "#C0C0C0", padding: "10px" }}>
      <Grid>
        <Row>
          <Column>
            <TextInput
              id="firstname"
              invalid={false}
              invalidText="A valid value is required"
              labelText="First Name"
              light={true}
              type="text"
            />
          </Column>
          <Column>
            <TextInput
              id="lastname"
              invalid={false}
              invalidText="A valid value is required"
              labelText="Last Name"
              light={true}
              type="text"
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <TextInput
              id="username-newuser"
              invalid={false}
              invalidText="A valid value is required"
              labelText="Username"
              light={true}
              type="text"
            />
          </Column>
          <Column>
            <TextInput
              id="password-newuser"
              invalid={false}
              invalidText="A valid value is required"
              labelText="Password"
              light={true}
              type="text"
            />
          </Column>        
        </Row>
        <Row>
          <TextInput
              id="email-newuser"
              invalid={false}
              invalidText="A valid value is required"
              labelText="Email"
              light={true}
              type="text"
          />
        </Row>
        <Row>
          <Button
            kind="primary"
            onClick={registerUserSubmit}
            type="button"
          >
            Create New User
          </Button>
        </Row>
      </Grid>
    </div>
  );
};

export default NewUser;