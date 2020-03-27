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
  };

  return (
    <div style={{ backgroundColor: "#F5F5F5", borderRadius: "15px 15px 15px 15px", padding: "30px", width: 500 }}>
      <h4>Create New User</h4>
      <Form
        onSubmit={handleFormSubmit}
      >
        <FormGroup
          invalid={false}
          message={false}
          legendText=""
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
          <TextInput.PasswordInput
            hidePasswordLabel="Hide password"
            id="password-newuser"
            invalid={false}
            invalidText="A valid value is required"
            labelText="Password"
            light={true}
            //type="text"       causes issue with hiding password
            showPasswordLabel="Show password"
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