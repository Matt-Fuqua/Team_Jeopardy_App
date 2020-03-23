import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { registerUserThunkAction } from '../actions/registerUser';
import { Button, Form, FormGroup, TextInput } from 'carbon-components-react';

const NewUser = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleFormSubmit = e => {
    e.preventDefault();
    dispatch(registerUserThunkAction(username, password, email, firstName, lastName));
    setUsername("");
    setPassword("");
    setEmail("");
    setFirstName("");
    setLastName("");
  }

  return (
    <div style={{ backgroundColor: "#C0C0C0", padding: "10px" }}>
      <h4>Create New User</h4>
      <Form
        onSubmit={handleFormSubmit}
      >
        <FormGroup
          invalid={false}
          legendText="General Information"
          message={false}
        >
          <TextInput
            id="firstname-newuser"
            invalid={false}
            invalidText="A valid value is required"
            labelText="First Name"
            light={true}
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <TextInput
            id="lastname-newuser"
            invalid={false}
            invalidText="A valid value is required"
            labelText="Last Name"
            light={true}
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <TextInput
            id="email-newuser"
            invalid={false}
            invalidText="A valid value is required"
            labelText="Email"
            light={true}
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup
          invalid={false}
          legendText="Credentials"
          message={false}
        >
          <TextInput
            id="username-newuser"
            invalid={false}
            invalidText="A valid value is required"
            labelText="Username"
            light={true}
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextInput
            id="password-newuser"
            invalid={false}
            invalidText="A valid value is required"
            labelText="Password"
            light={true}
            type="text"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button
          kind="primary"
          type="submit"
        >
          Create New User
        </Button>
      </Form>
    </div>
  );
};

export default NewUser;