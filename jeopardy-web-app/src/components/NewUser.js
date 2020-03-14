import React from 'react';
import { Button, Column, Grid, Row, TextInput } from 'carbon-components-react';

const NewUser = () => {
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
            onClick={()=>console.log("You tried to login")}
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